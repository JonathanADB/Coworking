const  authenticate= (req, res, next)=> {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'No existe token' });
    }
  
    try {
      // Verificar el token usando la clave secreta
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
  
      // Continuar con la siguiente función de middleware o ruta
      next(); 
    } catch (err) {
      return res.status(401).json({ error: 'Token invalido' });
    }
  }
  export default authenticate;