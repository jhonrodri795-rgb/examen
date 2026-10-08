import { expect, test, type Page } from '@playwright/test';

/**
 * Estas pruebas interceptan la API local para comprobar la integración de la
 * interfaz con proveedores configurados (consentimiento, transcripción,
 * evaluación y errores). La aplicación real nunca simula estas respuestas.
 */
const caps = {
  version: '1.0.0',
  stt: { configured: true, provider: 'openai', model: 'whisper-1', dataPolicy: 'El audio se envía a api.openai.com para transcribirlo.' },
  pronunciation: { configured: false, provider: null, model: null, dataPolicy: 'Sin evaluación fonética.' },
  evaluator: { configured: true, provider: 'anthropic', model: 'claude-opus-5-5', dataPolicy: 'La transcripción se envía a la API de Anthropic.' },
  limits: { maxAudioBytes: 10485760, maxAudioSec: 120, minAudioSec: 0.8, maxTextChars: 8000, acceptedAudioTypes: ['audio/webm'] },
  storage: 'El servidor no guarda datos.',
};

const TEXT = 'I prefer studying alone because I can focus better. For example, I review my notes in the library every morning.';
const transcript = {
  provider: 'openai', model: 'whisper-1', text: TEXT, durationSec: 6,
  words: TEXT.split(' ').map((w, i) => ({ word: w, start: i * 0.4, end: i * 0.4 + 0.35 })),
  segments: [{ text: TEXT, start: 0, end: 6, confidence: 0.9 }],
  capabilities: { wordTimestamps: true, wordConfidence: false, segmentConfidence: true, fillerDetection: 'prompted' }, createdAt: Date.now(),
};
const evaluation = {
  provider: 'anthropic', model: 'claude-opus-5-5', mode: 'ai', overall: 3, overall5: 4,
  criteria: [
    { criterion: 'delivery', evaluable: true, score: 3, rationale: 'Ritmo constante.', evidence: [{ quote: 'longPauseCount = 0', source: 'audio-metrics' }] },
    { criterion: 'languageUse', evaluable: true, score: 3, rationale: 'Gramática correcta.', evidence: [{ quote: 'I can focus better', source: 'transcript' }] },
    { criterion: 'topicDevelopment', evaluable: true, score: 3, rationale: 'Razón y ejemplo.', evidence: [{ quote: 'For example, I review my notes', source: 'transcript' }] },
    { criterion: 'taskFulfillment', evaluable: true, score: 3, rationale: 'Responde a la pregunta.', evidence: [{ quote: 'I prefer studying alone', source: 'transcript' }] },
  ],
  strengths: ['Postura clara desde el inicio.'], issues: [], improvedResponse: 'I prefer studying alone because it helps me concentrate.',
  exercises: ['Añade una segunda razón.'], pronunciationAdvice: ['Sin evaluación fonética configurada.'],
  limitations: ['No se evaluó la pronunciación.'], droppedEvidence: 0, createdAt: Date.now(),
};

async function recordOpinion(page: Page) {
  await page.goto('/speaking?tab=practice');
  await page.getByLabel('Tipo de tarea').selectOption('independent-speaking');
  await page.getByRole('button', { name: 'Comenzar' }).click();
  await expect(page.getByText('Grabando')).toBeVisible({ timeout: 45_000 });
  await page.waitForTimeout(2500);
  await page.getByRole('button', { name: 'Terminar respuesta' }).click();
}

test('pide consentimiento, transcribe y muestra la evaluación con IA basada en evidencia', async ({ page }) => {
  let transcribeCalls = 0;
  let consentHeader: string | null = null;
  await page.route('**/api/capabilities', (r) => r.fulfill({ json: caps }));
  await page.route('**/api/speaking/transcribe**', (r) => {
    transcribeCalls++;
    consentHeader = r.request().headers()['x-external-processing-consent'] ?? null;
    return r.fulfill({ json: transcript });
  });
  await page.route('**/api/speaking/evaluate', (r) => r.fulfill({ json: evaluation }));

  await recordOpinion(page);
  const dialog = page.getByRole('dialog', { name: '¿Enviar datos a un servicio externo?' });
  await expect(dialog).toBeVisible({ timeout: 20_000 });
  await expect(dialog).toContainText('api.openai.com');
  await expect(dialog).toContainText('Anthropic');
  await dialog.getByRole('button', { name: 'Permitir en esta sesión' }).click();

  await expect(page.getByText(/Evaluación con IA \(anthropic · claude-opus-5-5\)/)).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('button', { name: 'prefer' })).toBeVisible();
  await expect(page.getByText('«I can focus better»')).toBeVisible();
  await expect(page.getByText('Global 3/4')).toBeVisible();
  expect(transcribeCalls).toBe(1);
  expect(consentHeader).toBe('granted');

  // Corrección de la transcripción para estudiar: se conserva la original.
  await page.getByRole('button', { name: 'Corregir para estudiar' }).click();
  await page.getByLabel(/Versión corregida/).fill(`${TEXT} Thanks.`);
  await page.getByRole('button', { name: 'Guardar corrección' }).click();
  await expect(page.getByText('Tu versión corregida')).toBeVisible();
  await expect(page.getByRole('button', { name: 'prefer' })).toBeVisible();
});

test('si el usuario rechaza el envío no se contacta con el servicio externo', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/capabilities', (r) => r.fulfill({ json: caps }));
  await page.route('**/api/speaking/**', (r) => {
    calls++;
    return r.fulfill({ json: transcript });
  });
  await recordOpinion(page);
  const dialog = page.getByRole('dialog', { name: '¿Enviar datos a un servicio externo?' });
  await dialog.getByRole('button', { name: 'Ahora no' }).click();
  await expect(page.getByText(/no se otorgó el consentimiento/)).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('heading', { name: 'Métricas acústicas' })).toBeVisible();
  expect(calls).toBe(0);
});

test('transcripción fallida y evaluación incompleta muestran errores comprensibles y un informe parcial', async ({ page }) => {
  await page.route('**/api/capabilities', (r) => r.fulfill({ json: caps }));
  await page.route('**/api/speaking/transcribe**', (r) => r.fulfill({ status: 429, json: { error: { code: 'provider_rate_limited', message: 'Servicio de transcripción: límite de uso alcanzado. Inténtalo más tarde.' } } }));
  await recordOpinion(page);
  await page.getByRole('dialog').getByRole('button', { name: 'Permitir en esta sesión' }).click();
  await expect(page.getByText(/límite de uso alcanzado/)).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Evaluación heurística local/)).toBeVisible();

  // Ahora la transcripción funciona pero el evaluador falla → informe heurístico con aviso.
  await page.unroute('**/api/speaking/transcribe**');
  await page.route('**/api/speaking/transcribe**', (r) => r.fulfill({ json: transcript }));
  await page.route('**/api/speaking/evaluate', (r) => r.fulfill({ status: 502, json: { error: { code: 'provider_unavailable', message: 'El servicio de evaluación no está disponible.' } } }));
  await page.getByRole('button', { name: 'Volver a analizar' }).click();
  await expect(page.getByText(/La evaluación con IA falló/)).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('button', { name: 'prefer' })).toBeVisible();
});
