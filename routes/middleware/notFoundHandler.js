const notFoundHandler = (req, res, next) => {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    next(error);
  };
  
export default notFoundHandler;