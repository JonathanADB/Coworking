import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Utilizamos el archivo .env para configurar el modo de la aplicación, en modo desarrollo permitirá acceso a todas las solicitudes de origen y todos los métodos, en modo producción solo permitirá acceso a las solicitudes de origen que coincidan con el dominio establecido en CORS_ORIGIN y los métodos GET y POST.

const handleCors = (req, res, next) => {
  let corsOptions = {};

  if (process.env.MODE === 'DEVELOPMENT') {
    corsOptions.origin = '*';
    corsOptions.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  } else {
      corsOptions.origin = process.env.CORS_ORIGIN; // Creo que debería ser REACT_APP_CORS_ORIGIN
    corsOptions.methods = ['GET', 'POST'];
  }

  // Configurar middleware de CORS con las opciones determinadas
  cors(corsOptions)(req, res, next);
};

export default handleCors;