import { type Page, type Locator, expect } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: /username/i });
    this.passwordInput = page.getByRole("textbox", { name: /password/i });
    this.loginButton = page.getByRole("button", { name: /login/i });
    this.flashMessage = page.locator("#flash");
    this.heading = page.getByRole("heading", { name: /login/i });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(textoEsperado: RegExp) {
    const mensaje = this.flashMessage.filter({ hasText: /invalid/i });
    await expect(mensaje).toBeVisible();
    const texto = await mensaje.textContent();
    expect(texto).toMatch(textoEsperado);
  }
}
