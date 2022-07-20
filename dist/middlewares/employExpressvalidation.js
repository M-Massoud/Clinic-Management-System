"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationUpdataArry = exports.validationArry = void 0;
// const { body, param, query } = require("express-validator");
const express_validator_1 = require("express-validator");
const check = require('express-validator').check;
exports.validationArry = [
    (0, express_validator_1.body)('fullName')
        .isAlpha()
        .withMessage('Employe fullName shoud be characters'),
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .withMessage('Employe Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Employe email shoud be like example@email.com'),
    (0, express_validator_1.body)('address').isObject().withMessage('address should be object'),
    check('address.city').isString().withMessage('city name should be string'),
    check('address.street')
        .isString()
        .withMessage('street name should be string'),
    check('address.building')
        .isNumeric()
        .withMessage('building number should be number'),
    (0, express_validator_1.body)('mobile')
        .isMobilePhone('ar-EG')
        .withMessage('Employe mobile should be mobile numbers')
        .isLength({ min: 10, max: 14 })
        .withMessage('mobile length should be between 10 and 14  numbers'),
    (0, express_validator_1.body)('salary').isNumeric().withMessage('Employe salary should be Number..!'),
    (0, express_validator_1.body)('role')
        .optional()
        .isAlpha()
        .withMessage('Employe fullName shoud be characters'),
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .withMessage('Employe Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Employe email shoud be like example@email.com'),
    (0, express_validator_1.body)('address').isObject().withMessage('address should be object'),
    check('address.city').isString().withMessage('city name should be string'),
    check('address.street')
        .isString()
        .withMessage('street name should be string'),
    check('address.building')
        .isNumeric()
        .withMessage('building number should be number'),
    // body("mobile").isMobilePhone('ar-EG').withMessage("Employe mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    (0, express_validator_1.body)('salary').isNumeric().withMessage('Employe salary should be Number..!'),
    (0, express_validator_1.body)('role').isAlpha().withMessage('Employe role shoud be characters'),
];
exports.validationUpdataArry = [
    (0, express_validator_1.body)('fullName')
        .optional()
        .isAlpha()
        .withMessage('Employe fullName shoud be characters'),
    (0, express_validator_1.body)('password')
        .optional()
        .isStrongPassword()
        .withMessage('Employe Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('Employe email shoud be like example@email.com'),
    (0, express_validator_1.body)('address').optional().isObject().withMessage('address should be object'),
    check('address.city')
        .optional()
        .isString()
        .withMessage('city name should be string'),
    check('address.street')
        .optional()
        .isString()
        .withMessage('street name should be string'),
    check('address.building')
        .optional()
        .isNumeric()
        .withMessage('building number should be number'),
    (0, express_validator_1.body)('mobile')
        .optional()
        .isMobilePhone('ar-EG')
        .withMessage('Employe mobile should be mobile numbers')
        .isLength({ min: 10, max: 14 })
        .withMessage('mobile length should be between 10 and 14  numbers'),
    (0, express_validator_1.body)('role')
        .optional()
        .isAlpha()
        .withMessage('Employe role shoud be characters'),
];
