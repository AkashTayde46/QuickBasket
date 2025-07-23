const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `Duplicate field value: ${field}. Please use another value!`;
        err = new ErrorHandler(message, 400);
    }

    // Invalid JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid token. Please try again!`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expiration error
    if (err.name === "TokenExpiredError") {
        const message = `Token has expired. Please try again!`;
        err = new ErrorHandler(message, 400);
    }

    // Prevent multiple responses
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};


