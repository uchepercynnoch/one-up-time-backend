const appLogger = require("../utils/appLogger");

const globalExceptionsHandler = (err, req, res, next) => {
  const logger = appLogger(globalExceptionsHandler.name);

  if (res.headersSent) return next(err);

  if (err instanceof Error) {
    if (process.env.NODE_ENV !== "test") logger.error(err);

    return res.status(500).send(err.message);
  }

  if (process.env.NODE_ENV !== "test") logger.error(err);

  res.status(err.code).send(err.message);
};

module.exports = globalExceptionsHandler;
