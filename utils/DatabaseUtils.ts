import * as sql from 'mssql';
import { sqlConfig } from '../config/database.config';

export class DatabaseUtils {
    private pool: Promise<sql.ConnectionPool>;

    constructor() {
        this.pool = new sql.ConnectionPool(sqlConfig).connect();
    }

    async getClienteByUsuario(usuarioName: string, rol: string, garantia: string, tributacion: string) {
        try {
            const tributacionValor = tributacion === 'Exento' ? 969790000 : 969790001;
            const pool = await this.pool;
            const result = await pool
                .request()
                .input('usuario', sql.VarChar, usuarioName)
                .input('rol', sql.VarChar, rol)
                .input('garantia', sql.VarChar, garantia)
                .input('tributacion', sql.Int, tributacionValor)
                .query(`
                    SELECT TOP 1 
                        ud.tkl_name,
                        CASE c.tkl_tributacion 
                            WHEN 969790000 THEN 'Exento'
                            WHEN 969790001 THEN 'No Exento'
                        END as tributacion
                    FROM tkl_usuariosclientesdetalle ud
                    INNER JOIN tkl_clientes c
                    ON c.tkl_clientesId = ud.tkl_clientes
                    WHERE ud.tkl_usuariodphvirtualName = @usuario
                    AND ud.tkl_roldphvirtualName = @rol
                    AND c.tkl_garantia = @garantia
                    AND c.tkl_tributacion = @tributacion
                `);
            
            return {
                nombre: result.recordset[0]?.tkl_name,
                tributacion: result.recordset[0]?.tributacion
            };
        } catch (err) {
            console.error('Error al consultar cliente por usuario:', err);
            throw err;
        }
    }

    async getContenedorPendiente(clienteName: string, moduloName: string) {
        try {
            console.log('Buscando contenedor para el cliente:', clienteName);
            const pool = await this.pool;
            const result = await pool
                .request()
                .input('cliente', sql.VarChar, clienteName)
                .input('modulo', sql.VarChar, moduloName)
                .query(`
                    SELECT TOP 1 tkl_ContenedorName as contenedor
                    FROM tkl_demoracontenedor
                    WHERE tkl_ClienteName = @cliente
                    AND tkl_moduloname = @modulo
                    AND tkl_BalanceTotaldeDemora > 1
                    AND tkl_estadooperativo is not null
                    ORDER BY tkl_ContenedorName DESC
                `);
            
            console.log('Contenedor encontrado:', result.recordset);
            return result.recordset[0]?.contenedor;
        } catch (err) {
            console.error('Error al consultar contenedor pendiente:', err);
            throw err;
        }
    }
}