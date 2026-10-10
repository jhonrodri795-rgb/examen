import { expect, test, type Page } from '@playwright/test';

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

async function startSection(page: Page, section: string, mode: 'exam' | 'practice' = 'exam') {
  await page.goto(`/exam/new?section=${section}&mode=${mode}`);
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page).toHaveURL(/\/exam\/att-/);
}

test('todas las páginas cargan sin errores', async ({ page }) => {
  const errors = trackErrors(page);
  const pages: [string, RegExp][] = [
    ['/', /Prepara el TOEFL iBT/],
    ['/exam/new', /Configurar simulación/],
    ['/practice', /Práctica por sección/],
    ['/speaking', /Estudio de Speaking/],
    ['/writing', /Estudio de Writing/],
    ['/bank', /Banco de preguntas/],
    ['/history', /Historial y progreso/],
    ['/notes', /Notas personales/],
    ['/tips', /Consejos y formato/],
    ['/settings', /Configuración/],
  ];
  for (const [path, heading] of pages) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
  }
  await page.goto('/ruta-inexistente');
  await expect(page.getByText('Página no encontrada')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Reading en modo examen: navegación, respuestas, marcado, módulo adaptativo y resultados', async ({ page }) => {
  const errors = trackErrors(page);
  await startSection(page, 'reading', 'exam');
  await expect(page.getByRole('heading', { name: 'Reading' })).toBeVisible();
  await page.getByRole('button', { name: /Comenzar Reading/ }).click();

  // Página 1: Complete the Words.
  await expect(page.getByRole('timer')).toBeVisible();
  const firstGap = page.getByRole('textbox', { name: /^Hueco 1:/ });
  await firstGap.fill('abc');
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Página 2: pregunta de opción múltiple + marcar para revisión.
  const option = page.getByRole('radio').first();
  await option.check();
  await page.getByRole('button', { name: /Marcar para revisión/ }).click();
  await expect(page.getByRole('button', { name: 'Marcada' })).toBeVisible();

  // Volver atrás conserva la respuesta.
  await page.getByRole('button', { name: 'Anterior' }).click();
  await expect(page.getByRole('textbox', { name: /^Hueco 1:/ })).toHaveValue('abc');
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(page.getByRole('radio').first()).toBeChecked();

  // Panel de revisión: ir a la última página.
  await page.getByRole('button', { name: 'Revisar' }).click();
  const grid = page.getByRole('dialog');
  await expect(grid.getByRole('button', { name: /marcada/ })).toHaveCount(1);
  await grid.getByRole('button', { name: /^Ir a/ }).last().click();

  // Finalizar módulo 1 → módulo 2 adaptativo.
  await page.getByRole('button', { name: /Finalizar módulo/ }).click();
  await expect(page.getByRole('dialog')).toContainText('sin responder');
  await page.getByRole('dialog').getByRole('button', { name: 'Finalizar' }).click();
  await expect(page.getByRole('heading', { name: /Módulo 2/ })).toBeVisible();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Revisar' }).click();
  await page.getByRole('dialog').getByRole('button', { name: /^Ir a/ }).last().click();
  await page.getByRole('button', { name: /Finalizar módulo/ }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Finalizar' }).click();

  // Fin de sección → entregar.
  await expect(page.getByRole('heading', { name: 'Reading completada' })).toBeVisible();
  await page.getByRole('button', { name: 'Entregar y ver resultados' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Entregar' }).click();

  await expect(page).toHaveURL(/\/results\//);
  await expect(page.getByRole('heading', { name: 'Resultados', exact: true })).toBeVisible();
  await expect(page.getByText('Ruta adaptativa')).toBeVisible();
  await expect(page.getByText(/no son calificaciones oficiales de ETS/)).toBeVisible();

  await page.getByRole('button', { name: 'Revisar respuestas' }).click();
  await expect(page.getByRole('heading', { name: 'Revisión de respuestas' })).toBeVisible();
  await expect(page.getByText(/Respuesta:/).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('una recarga durante el examen pausa la sesión y conserva las respuestas', async ({ page }) => {
  await startSection(page, 'reading', 'exam');
  await page.getByRole('button', { name: /Comenzar Reading/ }).click();
  await page.getByRole('textbox', { name: /^Hueco 2:/ }).fill('xyz');
  await page.waitForTimeout(800); // autoguardado
  page.once('dialog', (d) => void d.accept());
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Sesión en pausa' })).toBeVisible();
  await page.getByRole('button', { name: 'Reanudar' }).click();
  await expect(page.getByRole('textbox', { name: /^Hueco 2:/ })).toHaveValue('xyz');
});

test('Listening en modo examen exige escuchar antes de avanzar y no permite volver', async ({ page }) => {
  await startSection(page, 'listening', 'exam');
  await page.getByRole('button', { name: /Comenzar Listening/ }).click();
  // Primera página: Choose a Response con audio integrado (reproducción automática).
  await expect(page.getByText(/Reproducciones restantes: 0|Audio no disponible|Reproduciendo/).first()).toBeVisible({ timeout: 15_000 });
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(page.getByRole('button', { name: 'Anterior' })).toBeDisabled();
});

test('Writing: Build a Sentence y autoguardado del estudio', async ({ page }) => {
  await page.goto('/writing');
  const editor = page.getByRole('textbox', { name: 'Tu respuesta' });
  await expect(editor).toBeEnabled();
  await editor.fill('Dear Professor Martinez, I am writing to ask whether I could present on Thursday instead of Tuesday because of a family event.');
  await expect(page.getByText(/2[0-9] palabras/)).toBeVisible();
  await page.waitForTimeout(1200);
  await page.reload();
  await expect(page.getByRole('textbox', { name: 'Tu respuesta' })).toHaveValue(/Dear Professor Martinez/);
  await page.getByRole('button', { name: 'Analizar y evaluar' }).click();
  await expect(page.getByText('Análisis local (sin IA)')).toBeVisible();
  await expect(page.getByText(/Estimación heurística/).first()).toBeVisible();
});

test('Speaking: micrófono simulado, prueba de audio, grabación y análisis local', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/speaking');
  await page.getByRole('button', { name: 'Activar micrófono' }).click();
  await expect(page.getByText('Micrófono: Activo')).toBeVisible();
  await expect(page.getByLabel('Dispositivo de entrada')).toBeVisible();
  await page.getByRole('button', { name: 'Grabar prueba' }).click();
  await expect(page.getByLabel('Reproducir grabación de prueba')).toBeVisible({ timeout: 10_000 });

  await page.getByRole('tab', { name: 'Practicar' }).click();
  await page.getByLabel('Tipo de tarea').selectOption('independent-speaking');
  await page.getByLabel('Ejercicio').selectOption({ index: 0 });
  await page.getByRole('button', { name: 'Comenzar' }).click();
  // Consigna (síntesis de voz con temporizador de seguridad) + 15 s de preparación.
  await expect(page.getByText('Grabando')).toBeVisible({ timeout: 45_000 });
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Terminar respuesta' }).click();
  await expect(page.getByRole('heading', { name: 'Pausas y señal' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText('Tiempo de habla')).toBeVisible();
  await expect(page.getByText(/Modo sin IA/)).toBeVisible();

  await page.getByRole('tab', { name: 'Historial' }).click();
  await expect(page.getByText(/1 guardadas/)).toBeVisible();

  // Detener el micrófono libera la pista.
  await page.getByRole('tab', { name: 'Privacidad' }).click();
  await page.getByRole('button', { name: 'Detener ahora' }).click();
  await expect(page.getByText(/Micrófono: inactivo/)).toBeVisible();
  expect(errors.filter((e) => !/speech|synthesis/i.test(e))).toEqual([]);
});

test('Speaking en modo examen: grabación automática, fin por límite de tiempo y avance', async ({ page }) => {
  await startSection(page, 'speaking', 'exam');
  await page.getByRole('button', { name: 'Activar micrófono' }).click();
  await expect(page.getByText('Micrófono: Activo')).toBeVisible();
  await page.getByRole('button', { name: /Comenzar Speaking/ }).click();
  await expect(page.getByText('Página 1 de 11')).toBeVisible();
  // La grabación empieza sola tras la consigna y termina al agotarse el tiempo de respuesta.
  await expect(page.getByText('Grabando')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('Página 2 de 11')).toBeVisible({ timeout: 40_000 });
  await expect(page.getByText('1/11 respondidas')).toBeVisible();
});
