import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const USER_VALIDO = 'tomsmith';
const PASS_VALIDA = 'SuperSecretPassword!';

test.describe('Login', () => {
  test('Happy path: login válido redirige al área segura', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER_VALIDO, PASS_VALIDA);
    await login.expectLoggedIn();
  });

  test('Happy path: login válido y logout correcto', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER_VALIDO, PASS_VALIDA);
    await login.expectLoggedIn();
    await login.logout();
    await login.expectLoggedOut();
  });

  test('Unhappy path: credenciales inválidas muestran mensaje de error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('usuario_invalido', 'password_invalida');
    await login.expectUsernameInvalidError();
  });

  test('Unhappy path: no introducir password muestra error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER_VALIDO, '');
    await login.expectPasswordInvalidError();
  });
});