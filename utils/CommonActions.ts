import { Page } from '@playwright/test';
import { ElementActions } from './ElementActions';
import { CommonObjects } from '../objects/CommonObjects';
import { DatabaseUtils } from './DatabaseUtils';

export class CommonActions {
    private elementActions: ElementActions;
    private page: Page;
    private dbUtils: DatabaseUtils;

    constructor(page: Page) {
        this.elementActions = new ElementActions(page);
        this.page = page;
        this.dbUtils = new DatabaseUtils();
    }

    async login() {
        await this.page.goto(CommonObjects.BASE_URL);
        await this.elementActions.click(CommonObjects.Correo_Usuario);
        await this.elementActions.escribir(CommonObjects.Correo_Usuario, CommonObjects.TEST_DATA.CORREO);
        await this.elementActions.click(CommonObjects.Clave_Usuario);
        await this.elementActions.escribir(CommonObjects.Clave_Usuario, CommonObjects.TEST_DATA.PASSWORD);
        await this.elementActions.click(CommonObjects.BOTON_Acceder);
    }

    async select_cliente() {
        const nombreCliente = await this.dbUtils.getClienteByUsuario('Miguel Benzan');
        if (!nombreCliente) {
            throw new Error('No se encontró cliente para el usuario');
        }
        await this.elementActions.click(CommonObjects.LISTA_CLIENTES);
        await this.elementActions.escribir(CommonObjects.CAMPO_CLIENTE, nombreCliente);
        await this.elementActions.presionarEnter(CommonObjects.CAMPO_CLIENTE);
    }
}