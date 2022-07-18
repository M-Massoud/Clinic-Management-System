import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default (request: Request, response: Response, next: NextFunction) => {
  interface Error {
    status?: number;
  }

  let result = validationResult(request);
  if (!result.isEmpty()) {
    //@ts-ignore
    let message: string = result.errors.reduce(
      (current: any, error: any) => current + error.msg + ' ',
      ''
    );
    let error = new Error(message);
    //@ts-ignore
    error.status = 422;
    throw error;
  } else next();
};

/*

import { validationResult } from 'express-validator';

// export default (request: Request, response: Response, next: NextFunction) => {

//     interface Error {
//         status?: number;
//     }

//     let result = validationResult(request);
//     if (!result.isEmpty()) {
//         //@ts-ignore
//         let message: string = result.errors.reduce((current, error) => current + error.msg + " ", "");
//         let error = new Error(message);
//         //@ts-ignore
//         error.status = 422;
//         throw error;
//     }
//     else
//         next();

// }
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

*/
