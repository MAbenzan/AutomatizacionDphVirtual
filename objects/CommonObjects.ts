import { AppConfig } from '../constants/Constants';
import { Page } from '@playwright/test';

export class CommonObjects {

    // Login
    static readonly Correo_Usuario = '//*[@id="email"]';
    static readonly Clave_Usuario = '//*[@id="password"]';
    static btnAcceder(page: Page) {return page.getByRole('button', { name: 'Acceder' });}

    // Cliente
    static lstClientes(page: Page) {return page.locator('[role="combobox"][aria-haspopup="listbox"]');}
    static campoCliente(page: Page) {return page.getByRole('combobox', { name: 'Search' });}

    //Menu
    static menuSolicitudes(page : Page) {return page.getByRole('link', { name: ' Solicitudes ' });} 
    static menuReportes(page : Page) {return page.getByRole('link', { name: ' Reportes ' });}  

    //Opciones Solicitudes
    static opcionAutorizacionSalida(page: Page) {return page.getByRole('link', { name: 'Autorización de Salida /' });}
    static opcionNumeroReferencia(page: Page) {return page.getByRole('link', { name: 'Numero de Referencia', exact: true });}
    static opcionNumeroReferenciaCP(page: Page) {return page.getByRole('link', { name: 'Numero de Referencia Cargos Portuario', exact: true });}
    static opcionReclamacion(page: Page) {return page.getByRole('link', { name: 'Reclamaciones'});}
    static opcionReleaseExport(page: Page) {return page.getByRole('link', { name: 'Release de Exportación' });}
    static opcionNúmeroReferenciaPrecinto(page: Page) {return page.getByRole('link', { name: 'Número de Referencia Precinto' });}

    static readonly CAMBIO_CONSIGNATARIO_IMPORT = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatarios Importacion")]'
    static readonly CAMBIO_CONSIGNATARIO_EXPORT = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatarios Exportacion")]'
    static readonly CAMBIO_CONSIGNATARIO_VEHICULO = '//a[contains(@href,"/Solicitud/ListaSolicitudes") and contains(text(),"Cambio de Consignatario Vehículos Ro-Ro")]'

    //Objetos comunes
    static btnNuevo(page: Page) {return page.getByRole('button', { name: '+ Nueva' });}
    static btnProximo(page: Page) {return page.getByRole('button', { name: 'Próximo ' });}
    static btnCancelar(page: Page) {return page.getByRole('button', { name: ' Cancelar' });}
    static btnFinalizar(page: Page) {return page.getByRole('button', { name: 'Finalizar ' });}
    static btnPrevio(page: Page) {return page.getByRole('button', { name: ' Previo' });}
    static btnSi(page: Page) {return page.getByRole('button', { name: 'Sí' });}
    static btnNo(page: Page) {return page.getByRole('button', { name: 'No' });}
    static btnCerrar(page: Page) {return page.getByRole('button', { name: 'Cerrar' });}
    static btnImprimir(page: Page) {return page.getByRole('button', { name: 'Imprimir' });}
    static campoBuscar(page: Page) {return page.getByRole('textbox', { name: 'BL, Contenedor o Booking' });}

    static checkAll(page: Page) {return page.getByRole('row', { name: 'BL / Booking Contenedor' }).getByRole('checkbox');}
    static chekPrimero(page: Page) {return page.locator('#demoras tbody input.select-box').first();}

    static textoPantallaReferencia(page: Page) {return page.getByRole('heading', { name: ' Numero de Referencia Tasa' });}

    //Tipo de pago 
    static checkPagoDemora(page: Page) {return page.locator('#tipopagoid div').filter({ hasText: 'Pago Demora' }).getByRole('radio');}
    static checkPagoFactura(page: Page) {return page.locator('#tipopagoid div').filter({ hasText: 'Factura' }).getByRole('radio');}
    static checkPagoFlete(page: Page) {return page.locator('#tipopagoid div').filter({ hasText: 'Servicio Cobro Flete de Vehí' }).getByRole('radio');}
    static checkPrecintosElectronicos(page: Page) {return page.locator('#tipopagoid div').filter({ hasText: 'Precintos Electronicos' }).getByRole('radio');}

    //Modulo
    static checkImportacion(page: Page) {return page.locator('#moduloid div').filter({ hasText: 'Importacion' }).getByRole('radio');}
    static checkExportacion(page: Page) {return page.locator('#moduloid div').filter({ hasText: 'Exportacion' }).getByRole('radio');}
    static checkVacio(page: Page) {return page.locator('#moduloid div').filter({ hasText: 'Vacios' }).getByRole('radio');}
    static checkServicioLogistico(page: Page) {return page.locator('#moduloid div').filter({ hasText: 'Servicio Logistico' }).getByRole('radio');}

    //Texto Mensajes
    static readonly TEXTO_SOLICITUD_EXITOSA = '.sweet-alert.visible p.lead.text-muted'
    static readonly TEXTO_GARANTIA_EXCEDIDA = '.sweet-alert.visible h2' 

    //Grid seleccion equipos
    static readonly CONTENEDOR = '#demoras > tbody > tr > td:nth-child(3)'

    //Resumen
    static deudaTotal(page: Page) {return page.locator('#demorasTotalWip tbody tr td').nth(0);}
    static itbisTotal(page: Page) {return page.locator('#demorasTotalWip tbody tr td').nth(1);}
    static totalDeposito(page: Page) {return page.locator('#demorasTotalWip tbody tr td').nth(2);}
    static totalAPagar(page: Page) {return page.locator('#demorasTotalWip tbody tr td.text-right');}

    
    static getGarantiaExcedida(page: Page) {return page.getByRole('heading', { name: 'Garantia excedida!' });}
    static getBotonNo(page: Page) {return page.getByRole('button', { name: 'No' });}

    
}


