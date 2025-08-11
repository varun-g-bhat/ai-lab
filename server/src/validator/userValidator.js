"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)('email')
            .isEmail()
            .withMessage('Must be a valid email')
            .normalizeEmail(),
        (0, express_validator_1.body)('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        (0, express_validator_1.body)('userDetails.name')
            .notEmpty()
            .withMessage('Name is required'),
        (0, express_validator_1.body)('userDetails.profileUrl')
            .optional()
            .isURL()
            .withMessage('Must be a valid URL'),
        (0, express_validator_1.body)('userDetails.dob')
            .optional()
            .isISO8601()
            .toDate()
            .withMessage('Must be a valid date')
    ];
};
exports.default = userValidationRules;
