import { defineConfig, devices } from "@playwright/test";

const esCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: esCI,
  retries: esCI ? 2 : 0,
  workers: esCI ? 1 : undefined,
  reporter: [["html"], ["list"]],

  use: {
    baseURL: "https://the-internet.herokuapp.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    /* WebKit solo se ejecuta en CI (Ubuntu). En desarrollo local sobre Fedora
     * el build de WebKit de Playwright es incompatible a nivel de ABI
     * (requiere ICU 74 y libjpeg-turbo8 de Ubuntu 24.04). */
    ...(esCI
      ? [{ name: "webkit", use: { ...devices["Desktop Safari"] } }]
      : []),
  ],
});
