"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.message,
        errorStack: process.env.NODE_ENV === "development" ? err.stack : "",
    });
};
exports.default = globalErrorHandler;
