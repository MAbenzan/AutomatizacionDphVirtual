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

    async select_cliente(
        rol: string, 
        garantia: string, 
        tributacion: typeof Tributacion[keyof typeof Tributacion] = Tributacion.NO_EXENTO
    ) {
        const clienteInfo = await this.dbUtils.getClienteByUsuario('Miguel Benzan', rol, garantia, tributacion);
        if (!clienteInfo || !clienteInfo.nombre) {
            throw new Error(`No se encontró cliente para el usuario con rol ${rol} y garantía ${garantia}`);
        }
        await this.elementActions.click(CommonObjects.LISTA_CLIENTES, true, 'Click en lista de clientes');
        await this.elementActions.click(CommonObjects.CAMPO_CLIENTE, true);
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');            
        await this.page.waitForTimeout(1000);
        
        console.log('Guardando cliente con tributación:', tributacion);
        TestContext.getInstance().setCliente({
            nombre: clienteInfo.nombre,
            tributacion: tributacion
        });
        
        await this.elementActions.escribir(CommonObjects.CAMPO_CLIENTE, clienteInfo.nombre, 'Campo cliente');
        await this.elementActions.presionarEnter(CommonObjects.CAMPO_CLIENTE);
    }

    async crearNumeroReferencia(tipoPago: string, modulo: string, demora: boolean) {

        await this.elementActions.click(CommonObjects.SOLICITUDES, true, 'Click en menu Solicitud');
        await this.elementActions.click(CommonObjects.NUMERO_REFERENCIA, true, 'Click en opcion Número de Referencia');
        await this.elementActions.click(CommonObjects.BOTTON_NUEVO, true, 'Click en botón Nuevo');
        await this.elementActions.click(CommonObjects.CHECK_PAGO_DEMORA, true, 'Click en campo Tipo de pago');
        await this.elementActions.click(CommonObjects.BOTTON_PROXIMO1, true, 'Click en botón Próximo paso 1');
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
        
        // Actualizar tributacion antes de la validación
        this.tributacion = this.clienteContext.getTributacion();
        console.log('Tipo de tributación del cliente:', this.tributacion);
        
        // Verificar montos y itbis
        if (this.tributacion === 'Exento') {
            console.log('Entrando en validación de cliente Exento');

            const total_itbis = Number(await this.elementActions.obtenerTexto(CommonObjects.ITBIS_TOTAL, 'Total ITBIS'));
            if (total_itbis !== 0) {
                throw new Error(`El total de ITBIS para cliente exento debe ser 0, pero es ${total_itbis}`);
            }      
            console.log(`ITBIS correcto para cliente exento, ITBIS:(${total_itbis})`);
            const total_deuda = Number(await this.elementActions.obtenerTexto(CommonObjects.DEUDA_TOTAL, 'Total deuda'));
            const total_a_pagar = Number(await this.elementActions.obtenerTexto(CommonObjects.TOTAL_A_PAGAR, 'Total a pagar'));
            if (total_deuda!== total_a_pagar) {
                throw new Error(`El total deuda (${total_deuda}) no coincide con el total a pagar (${total_a_pagar})`);
            }   
            console.log(`Total a pagar correcto, Total deuda: ${total_deuda}`);  
        } else {
            const total_itbis = Number(await this.elementActions.obtenerTexto(CommonObjects.ITBIS_TOTAL, 'Total ITBIS'));
            if (total_itbis === 0) {
                throw new Error(`El total de ITBIS para cliente no exento debe ser mayor que 0, pero es ${total_itbis}`);
            }
            const total_deuda = Number(await this.elementActions.obtenerTexto(CommonObjects.DEUDA_TOTAL, 'Total deuda'));
            const itbis = Number((total_deuda * 0.18).toFixed(2));
            if (total_itbis !== itbis) {
                throw new Error(`El total de ITBIS calculado (${itbis}) no coincide con el total de ITBIS mostrado (${total_itbis})`);
            }
            console.log(`ITBIS correcto, Total deuda: ${total_deuda}, ITBIS: ${itbis}`);
            const total_pagar = Number(await this.elementActions.obtenerTexto(CommonObjects.TOTAL_A_PAGAR, 'Total a pagar'));
            const total_a_pagar = Number((total_deuda + itbis).toFixed(2));
            if (total_a_pagar !== total_pagar) {
                throw new Error(`El total a pagar calculado (${total_a_pagar}) no coincide con el total a pagar mostrado (${total_pagar})`);
            }
            console.log(`Total a pagar correcto, Total deuda: ${total_deuda} + ITBIS: ${itbis} = ${total_a_pagar}`);
        }
        await this.elementActions.click(CommonObjects.BOTTON_FINALIZAR, true, 'Click en botón Finalizar');
        await this.elementActions.click(CommonObjects.BOTTON_SI, true, 'Click en botón Sí');
        await this.elementActions.obtenerTexto(CommonObjects.TEXTO_SOLICITUD_EXITOSA, 'Solicitud creada de forma exitosa!');
        await this.elementActions.click(CommonObjects.BOTTON_CERRAR, true, 'Click en botón Cerrar');
        await this.elementActions.obtenerTexto(CommonObjects.TEXTO_PANTALLA_REFERENCIA, 'Numero de Referencia');
    }
}