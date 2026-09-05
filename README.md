# demo-playwright

Proyecto de testing end-to-end con **Playwright** y **TypeScript**, orientado a testing frontend, sobre el sitio de práctica [The Internet (Herokuapp)](https://the-internet.herokuapp.com).

Construido como pieza de portfolio para procesos de selección de QA Automation en Barcelona, España.

## Qué demuestra este proyecto

- Organización con **Page Object Model** (POM)
- Separación de datos de prueba del código de los tests
- Locators semánticos (`getByRole`, `getByLabel`) en vez de selectores CSS frágiles
- Suite de tests agrupada con `test.describe` y `beforeEach`
- Integración continua con **GitHub Actions**
- Ejecución cross-browser (Chromium, Firefox, y WebKit en CI)

## Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- GitHub Actions (CI/CD)

## Estructura del proyecto

```
demo-playwright/
├── .github/workflows/    # Pipeline de CI
├── data/                 # Datos de prueba (usuarios, credenciales)
├── pages/                # Page Objects
├── tests/                # Casos de prueba
├── playwright.config.ts  # Configuración de Playwright
└── package.json
```

## Requisitos previos

- Node.js 22 o superior
- npm

## Instalación

```bash
git clone https://github.com/smithsneiderangulomontero-hub/demo-playwright.git
cd demo-playwright
npm install
npx playwright install
```

> **Nota (Fedora/Linux no basado en Debian):** el flag `--with-deps` de Playwright no funciona fuera de distros basadas en Debian/Ubuntu. En Fedora, instala solo los navegadores con `npx playwright install` (sin `--with-deps`). Por esa misma razón, WebKit está deshabilitado en ejecución local y solo corre en CI (ver `playwright.config.ts`).

## Ejecutar los tests

```bash
npm test              # Ejecuta todos los tests en modo headless
npm run test:headed   # Ejecuta con el navegador visible
npm run test:ui       # Abre el modo UI interactivo de Playwright
npm run report        # Abre el último reporte HTML generado
```

## Casos de prueba cubiertos

Suite de **Login** (`tests/example.spec.ts`):

- Credenciales inválidas → mensaje de error
- Credenciales válidas → acceso a área segura
- Usuario vacío → mensaje de error
- Password vacío → mensaje de error

## CI/CD

Cada `push` y `pull request` a `main` dispara el workflow en `.github/workflows/playwright.yml`, que instala dependencias, navegadores, corre la suite completa (incluyendo WebKit) y publica el reporte HTML como artefacto descargable.

## Autor

**Smith** — QA Engineer con más de 10 años de experiencia en testing funcional y automatización, en transición hacia especialización frontend con Playwright.
