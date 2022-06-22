const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "invalid id" });
  }

  next(error);
};

module.exports = {
  errorHandler,
};
