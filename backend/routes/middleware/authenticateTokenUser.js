import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const authenticate =async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "No existe token" });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();

    
  } catch (err) {
    return res.status(401).json({ error: "Token invalido" });
  }
};

export default authenticate;