import { Page } from '@playwright/test';
import { ElementActions } from './ElementActions';
import { CommonObjects } from '../objects/CommonObjects';
import { DatabaseUtils } from './DatabaseUtils';
import { AppConfig, Roles, Garantias, TipoPago, Modulos, Tributacion } from '../constants/Constants';
import { TestContext } from './TestContext';

export class CommonActions {
    private elementActions: ElementActions;
    private page: Page;
    private dbUtils: DatabaseUtils;
    private clienteContext: any;
    private tributacion: string;

    constructor(page: Page) {
        this.elementActions = new ElementActions(page);
        this.page = page;
        this.dbUtils = new DatabaseUtils();
        this.clienteContext = TestContext.getInstance();
        this.tributacion = this.clienteContext.getTributacion();
    }

    async login() {
        await this.page.goto(AppConfig.BASE_URL);
        await this.elementActions.escribir(CommonObjects.Correo_Usuario, AppConfig.TEST_DATA.CORREO, 'Correo de usuario');
        await this.elementActions.escribir(CommonObjects.Clave_Usuario, AppConfig.TEST_DATA.PASSWORD, 'Clave de usuario');
        await this.elementActions.click(CommonObjects.BOTON_Acceder, true, 'Click en botón Acceder');
    }

    async select_cliente(rol: string, garantia: string, tributacion: 'Exento' | 'No Exento' = 'No Exento') {
        const clienteInfo = await this.dbUtils.getClienteByUsuario('Miguel Benzan', rol, garantia, tributacion);
        if (!clienteInfo || !clienteInfo.nombre) {
            throw new Error(`No se encontró cliente para el usuario con rol ${rol} y garantía ${garantia}`);
        }
        await this.elementActions.click(CommonObjects.LISTA_CLIENTES, true, 'Click en lista de clientes');
        await this.elementActions.click(CommonObjects.CAMPO_CLIENTE, true, 'Click en campo de cliente');
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');            
        await this.page.waitForTimeout(1000);
        
        TestContext.getInstance().setCliente({
            nombre: clienteInfo.nombre
            ,tributacion: tributacion
        });
        
        await this.elementActions.escribir(CommonObjects.CAMPO_CLIENTE, clienteInfo.nombre, 'Campo cliente');
        await this.elementActions.presionarEnter(CommonObjects.CAMPO_CLIENTE);
    }

    async crearNumeroReferencia(tipoPago: string, modulo: string, demora: boolean) {
        if (demora) {
            const clienteActual = this.clienteContext.getCliente();
            const contenedor = await this.dbUtils.getContenedorPendiente(clienteActual);
            if (!contenedor) {
                throw new Error(`No se encontraron contenedores pendientes para el cliente ${clienteActual}`);
            }    
            await this.page.waitForSelector(CommonObjects.CAMPO_BUSCAR, { timeout: 5000 });
            await this.elementActions.escribir(CommonObjects.CAMPO_BUSCAR, contenedor, 'Buscar contenedor');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            await this.elementActions.click(CommonObjects.CHECK_1, true, 'Seleccionar contenedor encontrada');
        }
        else {
            await this.elementActions.click(CommonObjects.CHECK_1, true, 'Seleccionar primera contenedor encontrada'); 
        }
        await this.elementActions.click(CommonObjects.BOTTON_PROXIMO2, true, 'Click en botón Próximo paso 2');  
        
        // Verificar montos y itbis
        if (this.tributacion === 'Exento') {
            console.log('Cliente Exento: Verificando montos sin ITBIS');
        } else {
            console.log('Cliente No Exento: Verificando montos con ITBIS');
        }
        await this.elementActions.click(CommonObjects.BOTTON_FINALIZAR, true, 'Click en botón Finalizar');
        await this.elementActions.click(CommonObjects.BOTTON_SI, true, 'Click en botón Sí');
        await this.elementActions.obtenerTexto(CommonObjects.TEXTO_SOLICITUD_EXITOSA, 'Solicitud creada de forma exitosa!');
        await this.elementActions.click(CommonObjects.BOTTON_CERRAR, true, 'Click en botón Cerrar');
        await this.elementActions.obtenerTexto(CommonObjects.TEXTO_PANTALLA_REFERENCIA, 'Numero de Referencia');
    }
}