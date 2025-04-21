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
    IMPORTACION: CommonObjects.CHECK_IMPORTACION,
    EXPORTACION: CommonObjects.CHECK_EXPORTACION,
    VACIO: CommonObjects.CHECK_VACIO,
    SERVICIOLOGISTICO: CommonObjects.CHECK_SERVICIO_LOGISTICO
} as const;

// Agregar este enum a tus constantes existentes
export enum Tributacion {
    EXENTO = 'Exento',
    NO_EXENTO = 'No Exento'
}
