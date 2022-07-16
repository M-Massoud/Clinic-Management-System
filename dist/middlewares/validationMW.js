"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require("express-validator");
const validationMW = (request, response, next) => {
    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.errors.reduce((current, error) => current + error.msg + " ", "");
        let error = new Error(message);
        // error.status<Error>= 422;
        throw error;
    }
    else
        next();
};
exports.default = validationMW;
