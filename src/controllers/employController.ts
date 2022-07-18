import Employe from './../models/empolyModel';
import {RequestHandler } from 'express';
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(8);

// let Admin = mongoose.model('Admin');

export const getAllEmploye:RequestHandler = (request, response, next) => {
    Employe.find({})
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};

export const getEmployeById:RequestHandler = (request, response, next) => {
    Employe.findOne({ _id: request.params.id })
        .then((data: any) => {
            if (data == null) { next(new Error('Employe not found')); }
            else { response.status(200).json(data); }
           
        })
        .catch((error: any) => {
            next(error);
        })
};

export const createEmploye:RequestHandler = (request, response, next) => {
   //bcrypt.hash((request.body as {password:String}).password, function (error: Error, hash: any) {
        let object = new Employe({
            _id: request.body.id,
            fullName: (request.body as {fullName:String}).fullName,
            email: (request.body as {email:String}).email,
            password: (request.body as {password:String}).password,
            address: (request.body as {address:{city:String,street:String,building:Number}}).address,
            salary: (request.body as {salary:Number}).salary,
            mobile: (request.body as {mobile:Number}).mobile,
            role: (request.body as {role:String}).role,
        });
        object.save()
            .then((data:any) => {
                response.status(201).json({data:"Employe data added successfully"})
        }).catch((error:any)=>next(error))
    //});
};

export const updateEmploye:RequestHandler = async (request, response, next) => {
    try {
        const data:any = await Employe.findOne({ _id: request.body.id });
        for (const key in request.body) {
            if (typeof request.body[key] == 'object') {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            } else data[key] = request.body[key];
        }
      
        await data.save();
      
        response.status(200).json({ data: 'Employe data updated' });
    } catch (error) {
        next(error)
    }
};

export const deleteEmploye:RequestHandler = (request, response, next) => {
    Employe.deleteOne({ _id: request.params.id }, {})
        .then((data:any) => {
            response.status(200).json(data);
    }).catch((error:any)=>next(error))
};

