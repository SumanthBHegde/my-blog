import winston from "winston"; // Assuming winston is installed for logging

// Logger setup
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console(),
  ],
});

export const errorResponseHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const invalidPathHandler = (req, res, next) => {
  let error = new Error("Invalid Path - The requested resource was not found");
  error.statusCode = 404;
  next(error);
};

