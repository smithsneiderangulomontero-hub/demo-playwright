import { test, expect } from '@playwright/test';

const URL_LOGIN = 'https://the-internet.herokuapp.com/login';
const USER_VALIDO = 'tomsmith';
const PASS_VALIDA = 'SuperSecretPassword!';

test('Happy path: login válido redirige al área segura', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByLabel(/username/i).fill(USER_VALIDO);
  await page.getByLabel(/password/i).fill(PASS_VALIDA);
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('#flash')).toContainText(/you logged into a secure area!/i);
});

test('Happy path: login válido y logout correcto', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByLabel(/username/i).fill(USER_VALIDO);
  await page.getByLabel(/password/i).fill(PASS_VALIDA);
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL(/\/secure/);

  // Logout
  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page).toHaveURL(URL_LOGIN);
  await expect(page.locator('#flash')).toContainText(/you logged out of the secure area!/i);
});

test('Unhappy path: credenciales inválidas muestran mensaje de error', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByLabel(/username/i).fill('usuario_invalido');
  await page.getByLabel(/password/i).fill('password_invalida');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(URL_LOGIN);
  await expect(page.locator('#flash')).toContainText(/your username is invalid!/i);
});

test('Unhappy path: no introducir password muestra error', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByLabel(/username/i).fill(USER_VALIDO);
  await page.getByLabel(/password/i).fill(''); // sin contraseña
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(URL_LOGIN);
  await expect(page.locator('#flash')).toContainText(/your password is invalid!/i);
});