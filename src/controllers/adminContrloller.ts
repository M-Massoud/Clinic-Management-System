import Admin from './../models/adminModel';
import {RequestHandler } from 'express';
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
const salt = bcrypt.genSaltSync(8);

// let Admin = mongoose.model('Admin');

export const getAllAdmins: RequestHandler = (request, response, next) => {
    Admin.find({})
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })
    
};

export const getAdminById:RequestHandler = (request, response, next) => {
    Admin.findOne({ _id: request.params.id })
        .then((data: any) => {
            if (data == null) { next(new Error('Admin not found')); }
            else { response.status(200).json(data); }
        })
        .catch((error: any) => {
            next(error);
        })
};

export const createAdmin:RequestHandler = (request, response, next) => {
    bcrypt.hash(
        (request.body as { password: string }).password,
        salt, function (error, hash) {
        let object = new Admin({
            _id: (request.body as {id:Types.ObjectId}).id,
            fullName: (request.body as {fullName:String}).fullName,
            email: (request.body as {email:String}).email,
            password: hash,
            mobile: (request.body as {mobile:Number}).mobile,
            role: (request.body as {role:String}).role,
        });
        object.save()
            .then((data:any) => {
                response.status(201).json({data:"Admin data added successfully"})
        }).catch((error:any)=>next(error))
    });
};

export const updateAdmin:RequestHandler = async (request, response, next) => {
    try {
        const data:any = await Admin.findOne({ _id: request.body.id });
        for (const key in request.body) {
            if (typeof request.body[key] == 'object') {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            } else data[key] = request.body[key];
        }
      
        await data.save();
      
        response.status(200).json({ data: 'updated' });
    } catch (error) {
        next(error)
    }
};

export const deleteAdmin:RequestHandler = (request, response, next) => {
    Admin.deleteOne({ _id: request.params.id }, {})
        .then((data:any) => {
            response.status(200).json(data);
    }).catch((error:any)=>next(error))
};

