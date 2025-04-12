import { Page, test } from '@playwright/test';

export class ElementActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(
        selector: string,
        takeScreenshot: boolean = false,
        description: string = 'click'
      ) {
        await test.step(description, async () => {
          const element = this.page.locator(selector);
          await element.waitFor({ state: 'visible' });
          await element.click();
      
          if (takeScreenshot) {
            const fileName = description
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, ''); // quitar caracteres especiales
      
            const screenshotPath = `test-results/screenshots/${fileName}.png`;
      
            // Tomar y adjuntar captura
            await this.page.screenshot({
              path: screenshotPath,
              fullPage: true,
            });
      
            await test.info().attach(description, {
              path: screenshotPath,
              contentType: 'image/png',
            });
          }
        });
      }
      
    
    
    async escribir(selector: string, texto: string) {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible' });
        await element.clear();
        await element.fill(texto);
    }

    async verificarTexto(selector: string, textoEsperado: string) {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible' });
        const textoActual = await element.innerText();
        const textoLimpio = textoActual.trim();
        const textoEsperadoLimpio = textoEsperado.trim();
        if (!textoLimpio.includes(textoEsperadoLimpio)) {
            throw new Error(`El texto no coincide. Esperado: ${textoEsperadoLimpio}, Actual: ${textoLimpio}`);
        }
    }

    async verificarMensaje(selector: string, textoEsperado: string) {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible' });
        await element.waitFor({ state: 'attached' });
        const textoActual = await element.textContent();
        const textoLimpio = textoActual?.trim() || '';
        if (textoLimpio !== textoEsperado) {
            throw new Error(`El mensaje no coincide. Esperado: ${textoEsperado}, Actual: ${textoLimpio}`);
        }
    }
}