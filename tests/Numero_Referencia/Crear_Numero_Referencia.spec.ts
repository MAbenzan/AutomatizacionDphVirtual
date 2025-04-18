import { test, expect } from '@playwright/test';
import { CommonActions } from '../../utils/CommonActions';
import { ElementActions } from '../../utils/ElementActions';
import { CommonObjects } from '../../objects/CommonObjects';
import { Garantias, Roles } from '../../constants/Constants';

test.describe('Crear Número de Referencia', () => {
  test('Crear número de referencia para importación con pago de demora', async ({ page }) => {
    test.setTimeout(60000);
    const commonActions = new CommonActions(page);
    const elementActions = new ElementActions(page);

    // 1. Login en la aplicación
    await commonActions.login();

    // 2. Selección de cliente
    await commonActions.select_cliente(Roles.CONSOLIDADORA, Garantias.GARANTIA_NO);

    // 3. Navegación al formulario
    await elementActions.click(CommonObjects.SOLICITUDES, true, 'Click en menú Solicitudes');
    await elementActions.click(CommonObjects.NUMERO_REFERENCIA, true, 'Click en opción Número de Referencia');
    await elementActions.click(CommonObjects.BOTTON_NUEVO, true, 'Click en botón Nuevo');

    // 4. Selección de tipo de pago
    await elementActions.click(CommonObjects.CHECK_PAGO_DEMORA, true, 'Check Pago de Demora');
    await elementActions.click(CommonObjects.BOTTON_PROXIMO1, true, 'Click en botón Próximo paso 1');

    // 5. Selección de módulo y demora
    await elementActions.click(CommonObjects.CHECK_IMPORTACION, true, 'Check Importación');
    await elementActions.click(CommonObjects.CHECK_1, true, 'Check demora específica');
    await elementActions.click(CommonObjects.BOTTON_PROXIMO2, true, 'Click en botón Próximo paso 2');

    // 6. Finalización y confirmación
    await elementActions.click(CommonObjects.BOTTON_FINALIZAR, true, 'Click en botón Finalizar');
    await elementActions.click(CommonObjects.BOTTON_SI, true, 'Click en botón Sí');

    // 7. Verificación de resultados
    await elementActions.obtenerTexto(CommonObjects.TEXTO_SOLICITUD_EXITOSA, 'Solicitud creada de forma exitosa!');
    await elementActions.click(CommonObjects.BOTTON_CERRAR, true, 'Click en botón Cerrar');
    await elementActions.obtenerTexto(CommonObjects.TEXTO_PANTALLA_REFERENCIA, 'Numero de Referencia');

    await page.close();
  });
});
