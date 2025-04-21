import { test, expect } from '@playwright/test';
import { CommonActions } from '../../utils/CommonActions';
import { Garantias, Modulos, Roles, TipoPago, Tributacion } from '../../constants/Constants';
import { TestContext } from '../../utils/TestContext';

test.describe('Crear Número de Referencia', () => {
    test.afterAll(() => {TestContext.getInstance().clear();});
        test('Crear número de referencia para importación con pago de demora', async ({ page }) => {
        test.setTimeout(60000);
        const commonActions = new CommonActions(page);

        await commonActions.login();
        await commonActions.select_cliente(Roles.CLIENTE, Garantias.GARANTIA_NO, Tributacion.NO_EXENTO);
        await commonActions.crearNumeroReferencia(TipoPago.DEMORA, Modulos.IMPORTACION, true);

        await page.close();
    });
});
