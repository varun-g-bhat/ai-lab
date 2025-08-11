"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyValidation = exports.validateDiscussion = void 0;
const express_validator_1 = require("express-validator");
const validateDiscussion = () => {
    return [
        (0, express_validator_1.body)('title')
            .notEmpty()
            .withMessage('Title is required'),
        (0, express_validator_1.body)('description')
            .notEmpty()
            .withMessage('Description is required'),
        (0, express_validator_1.body)('tags')
            .optional()
            .isArray()
            .withMessage('Tags must be an array of strings'),
        (0, express_validator_1.body)('tags.*')
            .optional()
            .isString()
            .withMessage('Each tag must be a string')
    ];
};
exports.validateDiscussion = validateDiscussion;
const replyValidation = () => {
    return [
        (0, express_validator_1.body)('reply')
            .notEmpty()
            .withMessage('Reply content is required'),
    ];
};
exports.replyValidation = replyValidation;
