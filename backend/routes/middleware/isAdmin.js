import { getPool } from "../../database/getPool.js";

const pool = getPool();

export async function isAdmin(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        
        if (rows.length === 0) {
            // El usuario no existe en la base de datos
            return false;
        }
        
        if (rows[0].admin === true) {
            console.log("Eres admin");
            return true;
        }

        // El usuario no es admin
        return false;
        
    } catch (error) {
        // Manejo de errores
        console.error('Error al consultar la base de datos:', error);
        return false;
    }
};
