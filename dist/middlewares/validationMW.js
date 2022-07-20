"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = (request, response, next) => {
    let result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty()) {
        //@ts-ignore
        let message = result.errors.reduce((current, error) => current + error.msg + " ", "");
        let error = new Error(message);
        error.status = 422;
        throw error;
    }
    else
        next();
};
