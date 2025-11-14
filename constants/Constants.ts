import { CommonObjects } from '../objects/CommonObjects';

export const AppConfig = {
    BASE_URL: 'https://dphcrmtest:4443',
    TEST_DATA: {
        CORREO: 'mbenzan@dph.com.do',
        PASSWORD: 'Mabr1321**'
    }
} as const;

export const Roles = {
    CLIENTE: 'Cliente',
    CONSOLIDADORA: 'Consolidadora',
    ADMINISTRADOR_CHASIS: 'Administrador de Chasis',
    AGENCIA: 'Agencia',
    AGENCIA_ADUANAL: 'Agencia Aduanal',
    CLIENTE_EXPRES: 'Cliente Express',
} as const;

export const Garantias = {
   GARANTIA_SI: '1',
   GARANTIA_NO: '0' 
}

export const TipoPago = {
    DEMORA: CommonObjects.CHECK_PAGO_DEMORA,
    FACTURA: CommonObjects.CHECK_PAGO_FACTURA,
    FLETE: CommonObjects.CHECK_PAGO_FLETE
} as const;

export const Modulos = {
    IMPORTACION: { selector: CommonObjects.CHECK_IMPORTACION, nombre: 'Importación' },
    EXPORTACION: { selector: CommonObjects.CHECK_EXPORTACION, nombre: 'Exportación' },
    VACIO: { selector: CommonObjects.CHECK_VACIO, nombre: 'Vacio' },
    SERVICIOLOGISTICO: { selector: CommonObjects.CHECK_SERVICIO_LOGISTICO, nombre: 'Servicio Logístico' }
} as const;

export const Tributacion = {
    EXENTO: 'Exento',
    NO_EXENTO: 'No Exento'
} as const;
