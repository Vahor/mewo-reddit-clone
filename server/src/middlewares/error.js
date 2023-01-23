export const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};
