const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "invalid id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "invalid token" });
  }

  next(error);
};

const getToken = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

module.exports = {
  errorHandler,
  getToken,
};
