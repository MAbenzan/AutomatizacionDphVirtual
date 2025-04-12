import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    screenshot: 'on',
    trace: 'on',
    viewport: null,
    launchOptions: {
      slowMo: 1000,
      args: ['--ignore-certificate-errors', '--start-maximized'],
    },
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // Asegúrate de que el directorio esté accesible
    ['list'],
  ],
  outputDir: 'test-results/screenshots', // Se asegura de que las capturas de pantalla se guarden aquí
  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
      },
    },
  ],
};

export default config;
