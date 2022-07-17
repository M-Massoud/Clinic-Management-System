import { RequestHandler } from "express";
import mongoose, { Schema, Document, Date } from 'mongoose';
import Patient from "../models/patientModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface Error {
    message: string,
    status?: number,
}

export const loginPatient: RequestHandler = (request, response, next) => {
    // console.log(request.url.split('-')[1]);
    const detectSchemaFromUrl: string = request.url.split('-')[1];
    let requestedSchema: any;

    switch (detectSchemaFromUrl) {
        case 'admin':
            // requestedSchema = Admin;
            break;
        case 'patient':
            requestedSchema = Patient;
            break;
        case 'doctor':
            // requestedSchema = Doctor;
            break;
        case 'employee':
            // requestedSchema = Employee;
            break;
    }
    requestedSchema.findOne(
        { email: (request.body as { email: string }).email }, { password: 1, role: 1 })
        .then((patientData: any) => {
            if (!patientData) {
                let error: Error = new Error("email or password incorrect")
                error.status = 401;
                throw error;
            }
            else {
                bcrypt.compare((request.body as { password: string }).password, patientData.password).then(function (result: boolean): void {
                    if (result == true) {
                        let token = jwt.sign({
                            id: patientData._id,
                            role: patientData.role,
                        },
                            process.env.secret_Key as string, { expiresIn: "7d" })

                        response.status(200).json({ token, message: `login ${detectSchemaFromUrl}` });
                    }
                    else {
                        let error: Error = new Error("invalid email or password");
                        next(error);
                    }
                }
                );
            }
        })
        .catch((error: Error) => next(error));
}