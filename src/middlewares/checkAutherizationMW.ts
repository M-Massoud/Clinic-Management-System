import { Request, Response, NextFunction } from 'express';
import { IMyRequest } from "./authMW";
import { Error } from "../controllers/loginController";

export default (requiredRole: Array<string>) => (request: Request, response: Response, next: NextFunction) => {
    let authStatus: boolean = false;
    for (let choosenRole in requiredRole) {
        if ((request as IMyRequest).role == requiredRole[choosenRole]) {
            authStatus = true;
            next()
        }
    }
    // else {
    if (authStatus === false) {
        let error: Error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
    // }
}