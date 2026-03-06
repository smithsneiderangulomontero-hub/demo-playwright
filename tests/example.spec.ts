import { test, expect } from '@playwright/test';

/**
 * Prueba de login con credenciales inválidas.
 * Página de prueba: The Internet (Herokuapp) - formulario de login.
 * Objetivo: capturar y validar el mensaje de error cuando las credenciales son incorrectas.
 */
test('muestra mensaje de error al ingresar credenciales inválidas', async ({ page }) => {
  const urlLogin = 'https://the-internet.herokuapp.com/login';
  const credencialesInvalidas = { usuario: 'usuario_invalido', password: 'password_invalido' };

  // 1. Ir a la página de login
  await page.goto(urlLogin);

  // 2. Comprobar que el formulario está visible
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

  // 3. Rellenar credenciales inválidas
  await page.getByLabel(/username/i).fill(credencialesInvalidas.usuario);
  await page.getByLabel(/password/i).fill(credencialesInvalidas.password);

  // 4. Enviar el formulario (click en Login)
  await page.getByRole('button', { name: /login/i }).click();

  // 5. Capturar y validar el mensaje de error
  const mensajeError = page.locator('#flash').filter({ hasText: /invalid/i });
  await expect(mensajeError).toBeVisible();

  const textoError = await mensajeError.textContent();
  expect(textoError).toMatch(/your username is invalid!/i);

  // Opcional: asegurar que no se redirige al área privada
  await expect(page).toHaveURL(urlLogin);
});