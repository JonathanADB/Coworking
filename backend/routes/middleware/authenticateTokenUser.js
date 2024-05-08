import jwt from "jsonwebtoken";
import { getPool } from "../../database/getPool.js";
import { createError } from "../../utils/error.js";

const pool = getPool();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw createError(404, "Token no encontrado");
  }
  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET);
    const query = "SELECT * FROM users WHERE email = ?";
    const [[user]] = await pool.execute(query, [decoded.email]);
    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }
    req.user = decoded;
    // Lo he comentado porque había situaciones en las que se enviaban dos respuestas sobre una misma petición.
    // Si el usuario es encontrado, devuelve información sobre el usuario
    /*res.json({
      success: true,
      message: "Usuario y token Authenticado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        admin: user.admin,
      },
    });*/
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
