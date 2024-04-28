import { getPool } from "../database/getPool.js";
import { createError } from "../utils/error.js";

const dbPool = getPool();

export async function validateRegisterRequest({ username, email, password }) {
    

    if (!username || !email || !password) {
        throw createError(400, "Missing fields");
    }

    const [[user]] = await dbPool.execute(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, email]
    );

    if (user) {
        throw createError(400, "Username o email ya existen");
    }

    if (username.trim().length < 4) {
        throw createError(
            400,
            "Username debe contener al menos cuatro caracteres"
        );
    }

    return {
        username,
        email,
        password,
    };
}
