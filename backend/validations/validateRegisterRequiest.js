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
        throw createError(400, "Username or email already in use");
    }

    if (username.trim().length < 3) {
        throw createError(
            400,
            "Field 'Username' should have at least 3 characters"
        );
    }

    return {
        username,
        email,
        password,
    };
}
