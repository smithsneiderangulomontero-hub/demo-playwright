import { Page, Locator, expect } from '@playwright/test';

const URL_LOGIN = 'https://the-internet.herokuapp.com/login';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel(/username/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.flashMessage = page.locator('#flash');
    this.logoutLink = page.getByRole('link', { name: /logout/i });
  }

  async goto(): Promise<void> {
    await this.page.goto(URL_LOGIN);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/secure/);
    await expect(this.flashMessage).toContainText(/you logged into a secure area!/i);
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(URL_LOGIN);
    await expect(this.flashMessage).toContainText(/you logged out of the secure area!/i);
  }

  async expectUsernameInvalidError(): Promise<void> {
    await expect(this.page).toHaveURL(URL_LOGIN);
    await expect(this.flashMessage).toContainText(/your username is invalid!/i);
  }

  async expectPasswordInvalidError(): Promise<void> {
    await expect(this.page).toHaveURL(URL_LOGIN);
    await expect(this.flashMessage).toContainText(/your password is invalid!/i);
  }
}