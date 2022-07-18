import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";


export default (request: Request, response: Response, next: NextFunction) => {

    interface Error {
        status?: number;
    }

    let result = validationResult(request);
    if (!result.isEmpty()) {
        //@ts-ignore
        let message: string = result.errors.reduce((current, error) => current + error.msg + " ", "");
        let error = new Error(message);
        //@ts-ignore
        error.status = 422;
        throw error;
    }
    else
        next();

}

