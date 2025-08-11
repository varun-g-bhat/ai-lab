"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next((0, http_errors_1.default)(401, "Authorization token is required."));
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
        const _req = req;
        _req.userId = decoded.sub;
        next();
    }
    catch (err) {
        return next((0, http_errors_1.default)(401, "Token expired."));
    }
};
exports.default = authenticate;
