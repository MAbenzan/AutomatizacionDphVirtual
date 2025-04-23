import * as sql from 'mssql';

export const sqlConfig: sql.config = {
    user: 'userautotest',
    password: 'Mabr1321**',
    server: 'dphcrmdbtest', // o la IP/nombre de tu servidor SQL 2016
    database: 'DPHDEV_MSCRM',
    options: {
        encrypt: false,       // Generalmente false para SQL Server 2016 local
        trustServerCertificate: false, // False para entornos de producción
        enableArithAbort: true, // Recomendado para SQL Server 2016
        requestTimeout: 60000 // Tiempo de espera mayor para consultas
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};