import { AppConfig } from '../constants/Constants';
import { Page } from '@playwright/test';

export class CommonObjects {

    // Login
    static readonly Correo_Usuario = '//*[@id="email"]';
    static readonly Clave_Usuario = '//*[@id="password"]';
    static readonly BOTON_Acceder = '//*[@id="solicitudForm"]/div[4]/input';

    // Cliente
    static readonly LISTA_CLIENTES = 'body > div.nav-side-menu.panel-menu > div.brand.padding-10 > div > button > div';
    static readonly CAMPO_CLIENTE = 'body > div.nav-side-menu.panel-menu > div.brand.padding-10 > div > div > div.bs-searchbox > input'

    //Menu
    static readonly SOLICITUDES = '//*[@id="menu-content"]/li[1]'
    static readonly REPORTES = '//*[@id="menu-content"]/li[2]'

    //Opciones Solicitudes
    static readonly AUTORIZACION_SALIDA = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Autorización de Salida")]'
    static readonly NUMERO_REFERENCIA = '//a[contains(@href,"/Solicitud/ListaSolicitudes/5817E8FE-2CC1-E811-80EB-005056A12648") and text()="Numero de Referencia"]'
    static readonly NUMERO_REFERENCIA_CP = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Numero de Referencia Cargos Portuario")]'
    static readonly RECLAMACION = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Reclamaciones")]'
    static readonly CAMBIO_CONSIGNATARIO_IMPORT = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatarios Importacion")]'
    static readonly CAMBIO_CONSIGNATARIO_EXPORT = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatarios Exportacion")]'
    static readonly CAMBIO_CONSIGNATARIO_VEHICULO = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatario Vehículos Ro-Ro")]'

    //Objetos comunes
    static readonly BOTTON_NUEVO = '//*[@id="btnAdd"]'
    static readonly BOTTON_PROXIMO1 = ' //*[@id="btnnextstep1"]'
    static readonly BOTTON_PROXIMO2 = '//*[@id="btnnextstep2"]'
    static readonly BOTTON_CANCELAR1 = '//*[@id="step-1"]/div[2]/div[6]/button[2]'
    static readonly BOTTON_CANCELAR2 = '//*[@id="step-2"]/div[2]/div[6]/button[3]'
    static readonly BOTTON_FINALIZAR = '//*[@id="btnfinishstep3"]'
    static readonly BOTTON_SI = '.sweet-alert.visible .confirm.btn.btn-success'
    static readonly BOTTON_NO = '.sweet-alert.visible .cancel.btn.btn-danger'
    static readonly BOTTON_CERRAR = '.sweet-alert.visible .cancel.btn.btn-danger'
    static readonly BOTTON_IMPRIMIR = '.sweet-alert.visible .confirm.btn.btn-info'
    static readonly CAMPO_BUSCAR = '//*[@id="demoras-header"]/div/div/div[2]/div/input'
    static readonly CHECK_ALL = '//*[@id="demoras"]/thead/tr/th[1]/input'
    static readonly CHECK_1 = '//*[@id="demoras"]/tbody/tr[1]/td[1]/input'

    static readonly TEXTO_PANTALLA_REFERENCIA = '#accordion-dph.pull-left'

    //Tipo de pago 
    static readonly CHECK_PAGO_DEMORA = '//*[@id="b458458c-5ea5-e811-80eb-005056a12648"]'
    static readonly CHECK_PAGO_FACTURA = '//*[@id="5ee13b17-133e-ea11-80fa-005056af9c96"]'
    static readonly CHECK_PAGO_FLETE = '//*[@id="d5da75a4-0d5d-ec11-8112-005056afac3d"]' 

    //Modulo
    static readonly CHECK_IMPORTACION = '//*[@id="fc4b4202-7b7c-e711-80c8-005056a12648"]'
    static readonly CHECK_EXPORTACION = '//*[@id="5b665e10-7b7c-e711-80c8-005056a12648"]'
    static readonly CHECK_VACIO = '//*[@id="5c665e10-7b7c-e711-80c8-005056a12648"]'
    static readonly CHECK_SERVICIO_LOGISTICO = '//*[@id="5c665e10-7b7c-e711-80c8-005056a12648"]'

    //Texto Mensajes
    static readonly TEXTO_SOLICITUD_EXITOSA = '.sweet-alert.visible p.lead.text-muted'
    static readonly TEXTO_GARANTIA_EXCEDIDA = '.sweet-alert.visible h2' 

    //Grid seleccion equipos
    static readonly CONTENEDOR = '#demoras > tbody > tr > td:nth-child(3)'

    //Resumen
    static readonly DEUDA_TOTAL = '#demorasTotalWip > tbody > tr > td:nth-child(1)'
    static readonly ITBIS_TOTAL = '#demorasTotalWip > tbody > tr > td:nth-child(2)'
    static readonly TOTAL_DEPOSITO = '#demorasTotalWip > tbody > tr > td:nth-child(3)'
    static readonly TOTAL_A_PAGAR = '#demorasTotalWip > tbody > tr > td.text-right'

    
    // Modern Playwright selector method
    static getGarantiaExcedida(page: Page) {
        return page.getByRole('heading', { name: 'Garantia excedida!' });
    }
    
    static getBotonNo(page: Page) {
        return page.getByRole('button', { name: 'No' });
    }
}


