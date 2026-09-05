import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { usuarios } from "../data/users";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
  });

  test("muestra mensaje de error al ingresar credenciales inválidas", async ({
    page,
  }) => {
    await loginPage.login(
      usuarios.invalido.username,
      usuarios.invalido.password,
    );

    await loginPage.expectErrorMessage(/your username is invalid!/i);
    await expect(page).toHaveURL(/.*login/);
  });

  test("permite iniciar sesión con credenciales válidas", async ({ page }) => {
    await loginPage.login(usuarios.valido.username, usuarios.valido.password);

    await expect(page).toHaveURL(/.*secure/);
    await expect(page.locator("#flash")).toContainText(
      /you logged into a secure area/i,
    );
  });

  test("muestra mensaje de error cuando el campo de usuario está vacío", async ({
    page,
  }) => {
    await loginPage.login("", usuarios.valido.password);

    await loginPage.expectErrorMessage(/your username is invalid!/i);
  });

  test("muestra mensaje de error cuando el campo de password está vacío", async ({
    page,
  }) => {
    await loginPage.login(usuarios.valido.username, "");

    await loginPage.expectErrorMessage(/your password is invalid!/i);
  });
});
