import { Page, test } from '@playwright/test';

export class ElementActions {
    constructor(private page: Page) { }

    private async resaltarElemento(element: any) {
        await element.evaluate((node: HTMLElement) => {
            const originalBorder = node.style.border;
            node.style.border = '2px solid red';
            setTimeout(() => {
                node.style.border = originalBorder;
            }, 1000);
        });
    }


    async click(selector: string | Function, waitForElement: boolean = true, description: string = '') {
        try {
            if (typeof selector === 'function') {
                const element = selector(this.page);
                if (waitForElement) {
                    await element.waitFor({ state: 'visible' });
                }
                await this.resaltarElemento(element);
                await element.click();
                await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
            } else {
                if (waitForElement) {
                    await this.page.waitForSelector(selector, { state: 'visible' });
                }
                const element = this.page.locator(selector);
                await this.resaltarElemento(element);
                await element.click();
                await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
            }
            console.log(`Click exitoso en: ${description}`);
        } catch (error) {
            await this.page.screenshot({ path: `./screenshots/error_${description.replace(/\s/g, '_')}.png` });
            console.error(`Error al hacer click en: ${description}`, error);
            throw error;
        }
    }

    async escribir(selector: string | Function, texto: string, description: string = '') {
        try {
            const element = typeof selector === 'function' ? selector(this.page) : this.page.locator(selector);
            await element.waitFor({ state: 'visible' });
            await this.resaltarElemento(element);
            await element.clear();
            await element.fill(texto);
            await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
            console.log(`Texto "${texto}" escrito exitosamente en: ${description}`);
        } catch (error) {
            await this.page.screenshot({ path: `./screenshots/error_${description.replace(/\s/g, '_')}.png` });
            console.error(`Error al escribir "${texto}" en: ${description}`, error);
            throw error;
        }
    }

    async presionarEnter(selector: string | Function, description: string = '') {
        try {
            const element = typeof selector === 'function' ? selector(this.page) : this.page.locator(selector);
            await element.waitFor({ state: 'visible' });
            await this.resaltarElemento(element);
            await element.press('Enter');
            await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
        } catch (error) {
            await this.page.screenshot({ path: `./screenshots/error_${description.replace(/\s/g, '_')}.png` });
            throw error;
        }
    }

    async verificarTexto(selector: string | Function, textoEsperado: string, description: string = '') {
        try {
            const element = typeof selector === 'function' ? selector(this.page) : this.page.locator(selector);
            await element.waitFor({ state: 'visible' });
            await this.resaltarElemento(element);
            const textoActual = await element.innerText();
            const textoLimpio = textoActual.trim();
            const textoEsperadoLimpio = textoEsperado.trim();
            if (!textoLimpio.includes(textoEsperadoLimpio)) {
                throw new Error(`El texto no coincide. Esperado: ${textoEsperadoLimpio}, Actual: ${textoLimpio}`);
            }
            await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
        } catch (error) {
            await this.page.screenshot({ path: `./screenshots/error_${description.replace(/\s/g, '_')}.png` });
            throw error;
        }
    }

    async verificarMensaje(selector: string | Function, textoEsperado: string, description: string = '') {
        try {
            const element = typeof selector === 'function' ? selector(this.page) : this.page.locator(selector);
            await element.waitFor({ state: 'visible' });
            await element.waitFor({ state: 'attached' });
            await this.resaltarElemento(element);
            const textoActual = await element.textContent();
            const textoLimpio = textoActual?.trim() || '';
            if (textoLimpio !== textoEsperado) {
                throw new Error(`El mensaje no coincide. Esperado: ${textoEsperado}, Actual: ${textoLimpio}`);
            }
            await this.page.screenshot({ path: `./screenshots/${description.replace(/\s/g, '_')}.png` });
        } catch (error) {
            await this.page.screenshot({ path: `./screenshots/error_${description.replace(/\s/g, '_')}.png` });
            throw error;
        }
    }
}