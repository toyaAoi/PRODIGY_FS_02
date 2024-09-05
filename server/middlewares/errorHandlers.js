import logger from "../utils/logger.js";

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorCodes = {
  CAST_ERROR: "malformed id",
  VALIDATION_ERROR_USERNAME_REQUIRED: "username is required",
  VALIDATION_ERROR_USERNAME_MIN_LENGTH:
    "username must be at least 3 character long",
  VALIDATION_ERROR_NAME: "name must be at least 3 character long",
  MONGO_UNIQUE_USERNAME_ERROR: "expected `username` to be unique",
  MONGO_UNIQUE_EMAIL_ERROR: "expected `email` to be unique",
  MONGO_UNIQUE_PHONE_ERROR: "expected `phone` to be unique",

  JSON_WEB_TOKEN_ERROR: "token invalid",
  TOKEN_EXPIRED_ERROR: "token expired",
  UNKNOWN_ERROR: "Internal Server Error",
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  logger.error(error.message);
  logger.error(error.stack);

  const handleError = (statusCode, errorCode) => {
    response.status(statusCode).json({ error: errorCodes[errorCode] });
  };

  if (error.name === "CastError") {
    return handleError(400, "CAST_ERROR");
  }

  if (error.name === "ValidationError") {
    const errorPath = error.path;
    const errorKind = error.kind;

    if (errorPath === "username") {
      if (errorKind === "required") {
        return handleError(400, "VALIDATION_ERROR_USERNAME_REQUIRED");
      } else if (errorKind === "minlength") {
        return handleError(400, "VALIDATION_ERROR_USERNAME_MIN_LENGTH");
      }
    } else if (errorPath === "name") {
      return handleError(400, "VALIDATION_ERROR_NAME");
    }

    return handleError(400, "UNKNOWN_ERROR");
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.message.includes("username")) {
      return handleError(400, "MONGO_UNIQUE_USERNAME_ERROR");
    } else if (error.message.includes("email")) {
      return handleError(400, "MONGO_UNIQUE_EMAIL_ERROR");
    } else if (error.message.includes("phone")) {
      return handleError(400, "MONGO_UNIQUE_PHONE_ERROR");
    }
  }

  if (error.name === "JsonWebTokenError") {
    return handleError(401, "JSON_WEB_TOKEN_ERROR");
  }

  if (error.name === "TokenExpiredError") {
    return handleError(401, "TOKEN_EXPIRED_ERROR");
  }

  return handleError(500, "UNKNOWN_ERROR");
};

export default { unknownEndpoint, errorHandler };
