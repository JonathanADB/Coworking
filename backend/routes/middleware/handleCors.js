import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Utilizamos el archivo .env para configurar el modo de la aplicación, en modo desarrollo permitirá acceso a todas las solicitudes de origen y todos los métodos, en modo producción solo permitirá acceso a las solicitudes de origen que coincidan con el dominio establecido en CORS_ORIGIN y los métodos GET y POST.

const handleCors = (req, res, next) => {
  let corsOptions = {};

  if (process.env.MODE === 'PRODUCTION') {
    corsOptions.origin = process.env.CORS_ORIGIN;
    corsOptions.methods = ['GET', 'POST'];
  } else {
    corsOptions.origin = '*';
    corsOptions.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  }

  cors(corsOptions)(req, res, next);
};

export default handleCors;