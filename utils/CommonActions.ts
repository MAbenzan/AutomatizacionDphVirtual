import { Page } from '@playwright/test';
import { ElementActions } from './ElementActions';
import { CommonObjects } from '../objects/CommonObjects';

export class CommonActions {
    private elementActions: ElementActions;
    private page: Page;

    constructor(page: Page) {
        this.elementActions = new ElementActions(page);
        this.page = page;
    }

    async login() {
        await this.page.goto(CommonObjects.BASE_URL);
        await this.elementActions.click(CommonObjects.Correo_Usuario);
        await this.elementActions.escribir(CommonObjects.Correo_Usuario, CommonObjects.TEST_DATA.CORREO);
        await this.elementActions.click(CommonObjects.Clave_Usuario);
        await this.elementActions.escribir(CommonObjects.Clave_Usuario, CommonObjects.TEST_DATA.PASSWORD);
        await this.elementActions.click(CommonObjects.BOTON_Acceder);
    }
}