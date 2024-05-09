import { createError } from "../../utils/error.js";

const bodyParser = (req, res, next) => {
  try {
    
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' )  {
      let data = '';
  
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          console.log('Data received:', data); // Registra los datos recibidos para verificar el contenido.
          req.body = JSON.parse(data);
          next();
        } catch (error){
          throw createError(400, "Error al analizar el cuerpo de la solicitud");
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next(error)
  }
  };
  
export default bodyParser;