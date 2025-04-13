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