import { Page } from '@playwright/test';
import { ElementActions } from './ElementActions';
import { CommonObjects } from '../objects/CommonObjects';
import { DatabaseUtils } from './DatabaseUtils';
import { Roles } from '../constants/Constants';
import { AppConfig } from '../constants/Constants';

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
        await this.page.goto(AppConfig.BASE_URL);
        await this.elementActions.click(CommonObjects.Correo_Usuario);
        await this.elementActions.escribir(CommonObjects.Correo_Usuario, AppConfig.TEST_DATA.CORREO);
        await this.elementActions.click(CommonObjects.Clave_Usuario);
        await this.elementActions.escribir(CommonObjects.Clave_Usuario, AppConfig.TEST_DATA.PASSWORD);
        await this.elementActions.click(CommonObjects.BOTON_Acceder);
    }

    async select_cliente(rol: string = Roles.CLIENTE) {
        const nombreCliente = await this.dbUtils.getClienteByUsuario('Miguel Benzan', rol);
        if (!nombreCliente) {
            throw new Error(`No se encontró cliente para el usuario con rol ${rol}`);
        }
        
        await this.elementActions.click(CommonObjects.LISTA_CLIENTES);
        await this.elementActions.click(CommonObjects.CAMPO_CLIENTE);
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.waitForTimeout(1000);
        
        await this.elementActions.escribir(CommonObjects.CAMPO_CLIENTE, nombreCliente);
        await this.elementActions.presionarEnter(CommonObjects.CAMPO_CLIENTE);
    }
}