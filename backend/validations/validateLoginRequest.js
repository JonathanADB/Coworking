import { getPool } from "../database/getPool.js";
import {compare} from "bcrypt";


const dbpool = getPool();

export async function validateLoginRequest({username, email , password}) {

    const query = `SELECT * FROM users WHERE username = ? OR email = ?`;

    const [rows] = await dbpool.execute(query, [
        username || email, 
        username || email
    ]);
    if (rows.length === 0) {
        throw new Error ("Username o email incorrecto")
    }
    const user = rows[0];
    const isValid = await compare(password, user.password);

    if (!isValid) {
        throw new Error ("Contraseña Invalida")
        }
    
    
    return user;
  }