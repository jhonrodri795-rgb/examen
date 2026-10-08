import { expect, test } from '@playwright/test';

// Navegador que rechaza automáticamente las solicitudes de permiso.
test.use({
  launchOptions: {
    executablePath: process.env.PLAYWRIGHT_BROWSERS_PATH ? '/opt/pw-browsers/chromium' : undefined,
    args: ['--use-fake-device-for-media-stream', '--deny-permission-prompts'],
  },
});

test('micrófono denegado: estado bloqueado, instrucciones y opción de continuar sin grabar', async ({ page }) => {
  await page.goto('/speaking');
  await page.getByRole('button', { name: 'Activar micrófono' }).click();
  await expect(page.getByText('Permiso de micrófono denegado')).toBeVisible();
  await expect(page.getByText('Micrófono: Bloqueado')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible();

  // En la simulación, la sección de Speaking se puede omitir sin micrófono.
  await page.goto('/exam/new?section=speaking&mode=exam');
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.getByRole('button', { name: /Comenzar Speaking/ })).toBeDisabled();
  await page.getByRole('button', { name: 'Continuar sin micrófono' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Omitir sección' }).click();
  await expect(page.getByRole('heading', { name: 'Speaking omitida' })).toBeVisible();
});
