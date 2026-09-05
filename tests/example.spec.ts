import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

/**
 * Prueba de login con credenciales inválidas.
 * Página de prueba: The Internet (Herokuapp) - formulario de login.
 * Objetivo: capturar y validar el mensaje de error cuando las credenciales son incorrectas.
 */
test("muestra mensaje de error al ingresar credenciales inválidas", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const credencialesInvalidas = {
    usuario: "usuario_invalido",
    password: "password_invalido",
  };

  await loginPage.goto();
  await expect(loginPage.heading).toBeVisible();

  await loginPage.login(
    credencialesInvalidas.usuario,
    credencialesInvalidas.password,
  );

  await loginPage.expectErrorMessage(/your username is invalid!/i);
  await expect(page).toHaveURL(/.*login/);
});
