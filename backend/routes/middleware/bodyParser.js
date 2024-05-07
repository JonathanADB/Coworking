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
          req.body = JSON.parse(data);
          next();
        } catch (error) {
          throw createError(400, "Erro al analizar el cuerpo de la solicitud");
        }
      });
    } 
  } catch (error) {
    next(error)
  }
  };
  
export default bodyParser;