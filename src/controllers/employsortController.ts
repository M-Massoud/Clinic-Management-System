import Employe from './../models/empolyModel';
import { RequestHandler } from 'express';
// import {APIfeatures} from './../lib/features';


export const getSortedEmployeName:RequestHandler = (request, response, next) => {
    Employe.find({},{fullName:1}).sort('fullName')
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};

export const getSortedEmployeSalary:RequestHandler = (request, response, next) => {
    Employe.find({},{fullName:1,salary:1}).sort('salary')
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};
export const getSortedEmployeDesSalary:RequestHandler = (request, response, next) => {
    Employe.find({}, { fullName: 1, salary: 1 }).sort({ salary:-1 })
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};


export const filterEmploysalary:RequestHandler = (request, response, next) => {
    Employe.find({})
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};