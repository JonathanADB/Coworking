// import jwt from "jsonwebtoken";

// const { JWT_SECRET } = process.env;

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: "No existe token" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     const [rows] = await dbPool.execute(
//       `SELECT * FROM users WHERE id=?`,
//       [decoded.id]
//     ); 

//     if (rows.length === 0) {
//       return res.status(401).json({ error: "Usuario no encontrado" });
//     }

//     req.user = rows[0];

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token invalido" });
//   }
// };

// export default authenticate;

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







// import jwt from "jsonwebtoken";

// const { JWT_SECRET } = process.env;

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ error: "No existe token" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     const [rows] = await dbPool.execute(
//       `SELECT * FROM users WHERE id=?`,
//       [decoded.id]
//     ); 

//     if (rows.length === 0) {
//       return res.status(401).json({ error: "Usuario no encontrado" });
//     }

//     req.user = rows[0];

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token invalido" });
//   }
// };

// export default authenticate;