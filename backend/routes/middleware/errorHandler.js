const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    error: {
      status: err.statusCode,
      message: err.message
    },
  });
};

export default errorHandler;