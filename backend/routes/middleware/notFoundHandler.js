import { createError } from "../../utils/error.js";

const notFoundHandler = (req, res, next) => {
  const error = createError(404, 'Recurso no encontrado');
  next(error);
};
  
export default notFoundHandler;