import { createError } from "../../utils/error.js";

const notFoundHandler = (req, res, next) => {
  try {
    throw createError(404, 'Recurso no encontrado');
    
  } catch (error) {
        next(error);
 
  }
  };
  
export default notFoundHandler;