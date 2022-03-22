const errorAsyncMiddleware = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (e) {
    next(e);
  }
};

module.exports = errorAsyncMiddleware;
