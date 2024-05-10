import cors from 'cors';
import "dotenv/config.js";
import { createError } from '../../utils/error.js';

const handleCors = (req, res, next) => {
  let corsOptions = {
    origin: function (origin, callback) {
      if (process.env.MODE === 'PRODUCTION') {
        if (origin === process.env.CORS_ORIGIN) {
          callback(null, true)
        } else {
          callback(createError(403, 'No permitido por CORS'), false);
        }
      } else {
        callback(null, '*')
      }
    },
    methods: process.env.MODE === 'PRODUCTION' ? ['GET', 'POST'] : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  };

  cors(corsOptions)(req, res, next);
};

export default handleCors;