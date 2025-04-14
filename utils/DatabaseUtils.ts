import * as sql from 'mssql';
import { sqlConfig } from '../config/database.config';

export class DatabaseUtils {
    private pool: Promise<sql.ConnectionPool>;

    constructor() {
        this.pool = new sql.ConnectionPool(sqlConfig).connect();
    }

    /*async getDemoras(cliente: string) {
        try {
            const pool = await this.pool;
            const result = await pool
                .request()
                .input('cliente', sql.VarChar, cliente)
                .query('SELECT * FROM Demoras WHERE Cliente = @cliente');
                
            
            return result.recordset;
        } catch (err) {
            console.error('Error al consultar demoras:', err);
            throw err;
        }
    }*/

    async getClienteByUsuario(usuarioName: string, rol: string, garantia: string) {
        try {
            const pool = await this.pool;
            const result = await pool
                .request()
                .input('usuario', sql.VarChar, usuarioName)
                .input('rol', sql.VarChar, rol)
                .input('garantia', sql.VarChar, garantia)
                .query(`
	                SELECT TOP 1 ud.tkl_name 
                    FROM tkl_usuariosclientesdetalle ud
					INNER JOIN tkl_clientes c
					ON c.tkl_clientesId = ud.tkl_clientes
                    WHERE ud.tkl_usuariodphvirtualName = @usuario
                    AND ud.tkl_roldphvirtualName = @rol
					AND c.tkl_garantia = @garantia
                `);
            
            return result.recordset[0]?.tkl_name;
        } catch (err) {
            console.error('Error al consultar cliente por usuario:', err);
            throw err;
        }
    }
}