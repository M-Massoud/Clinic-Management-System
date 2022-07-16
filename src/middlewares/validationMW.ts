const { validationResult } = require("express-validator");
import {RequestHandler } from 'express';
const validationMW: RequestHandler = (request, response, next) => {
    interface Error {
        status?: number;
    }
    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.errors.reduce((current: string, error: any) => current + error.msg + " ", "");
        let error = new Error(message);
        // error.status<Error>= 422;
        throw error;
    }
    else
        next();
};
export default validationMW;

