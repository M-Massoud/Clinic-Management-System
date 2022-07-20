import Employe from '../models/empolyModel';
import { RequestHandler } from 'express';


export const lessSalaryEmploye: RequestHandler = (request, response, next) => {
    Employe.find({salary:{$lt:request.params.key}},{fullName:1,salary:1})
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };
  // highs than alary
  export const highSalaryEmploye: RequestHandler = (request, response, next) => {
    Employe.find({salary:{$gt:request.params.key}},{fullName:1,salary:1})
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };