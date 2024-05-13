import jwt from "jsonwebtoken";
import { getPool } from "../../database/getPool.js";
import { createError } from "../../utils/error.js";

const pool = getPool();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = createError(401, "No autorizado");
    return next(error);
  }
  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET);
    const query = "SELECT * FROM users WHERE email = ?";
    const [[user]] = await pool.execute(query, [decoded.email]);
    if (!user) {
      const error = createError(404, "Usuario no encontrado");
      return next(error);
    }
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;