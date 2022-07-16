"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationUpdataArry = exports.validationArry = void 0;
// const { body, param, query } = require("express-validator");
const express_validator_1 = require("express-validator");
// const check = require('express-validator').check;
exports.validationArry = [
    (0, express_validator_1.body)('invoiceReport')
        .isString()
        .withMessage('invoiceReport shoud be characters'),
    (0, express_validator_1.body)('appointmentReport')
        .isString()
        .withMessage('appointmentReport shoud be characters')
];
exports.validationUpdataArry = [
    (0, express_validator_1.body)('invoiceReport').optional()
        .isString()
        .withMessage('invoiceReport shoud be characters'),
    (0, express_validator_1.body)('appointmentReport').optional()
        .isString()
        .withMessage('appointmentReport shoud be characters')
];
