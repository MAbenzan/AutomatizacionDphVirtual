import { test, expect } from '@playwright/test';
import { CommonActions } from '../../utils/CommonActions';
import { ElementActions } from '../../utils/ElementActions';
import { CommonObjects } from '../../objects/CommonObjects';
import { Garantias, Roles } from '../../constants/Constants';

test.describe('Crear Autorización de Salida', () => {
  test('Crear autorización de salida para importación con pago de demora', async ({ page }) => {
    test.setTimeout(60000);
    const commonActions = new CommonActions(page);
    const elementActions = new ElementActions(page);  

    // 1. Login en la aplicación
    await commonActions.login();

    // 2. Selección de cliente
    await commonActions.select_cliente(Roles.CONSOLIDADORA, Garantias.GARANTIA_SI);

    // 3. Navegación al formulario
    await elementActions.click(CommonObjects.SOLICITUDES, true, 'Click en menú Solicitudes');
    await elementActions.click(CommonObjects.AUTORIZACION_SALIDA, true, 'Click en menú Autorización de Salida');
    await elementActions.click(CommonObjects.BOTTON_NUEVO, true, 'Click en botón Nueva');
    await elementActions.click(CommonObjects.BOTTON_PROXIMO1, true, 'Click en botón Próximo paso 1');

    // 4. Selección de módulo y demora
    await elementActions.click(CommonObjects.CHECK_IMPORTACION, true, 'Check Importación');
    await elementActions.click(CommonObjects.BOTTON_PROXIMO2, true, 'Click en botón Próximo paso 2');
    await elementActions.click(CommonObjects.CHECK_1, true, 'Check demora específica');
    await elementActions.click(CommonObjects.BOTTON_PROXIMO2, true, 'Click en botón Próximo paso 2');

    // Get text and verify message
    const mensajeGarantia = await CommonObjects.getGarantiaExcedida(page).textContent();
    expect(mensajeGarantia).toContain('Garantia excedida!');
    if (mensajeGarantia==='Garantia excedida!') {   
        await CommonObjects.getBotonNo(page).click();
    }

  })
})