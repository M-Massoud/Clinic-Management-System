import { RequestHandler } from "express";
import Patient from "../models/patientModel";
import Doctor from "../models/DoctorModel";
import Employe from './../models/empolyModel';
import Admin from './../models/adminModel';
import bcrypt from "bcrypt";
import { IMyRequest } from "../middlewares/authMW";

const salt: string = bcrypt.genSaltSync(Number(process.env.saltRounds as string));

export const changePatientPassword: RequestHandler = async (request, response, next) => {

    try {
        let patientData: any = await Patient.findOne({ _id: (request as IMyRequest).id }, { _id: 0, password: 1 });
        if (patientData == null) {
            next(new Error("Patient Old Password Is Incorrect"));
        }
        else {
            if (request.body.oldPassword != request.body.newPassword) {
                bcrypt.compare((request.body as { oldPassword: string }).oldPassword, patientData.password).then(function (result: boolean): void {
                    if (result == true) {
                        bcrypt.hash(request.body.newPassword, salt, async function (err: any, hash: string) {
                            await Patient.updateOne({ _id: (request as IMyRequest).id }, { $set: { password: hash } })
                            response.status(200).json({ data: "Patient password updated successfully" });
                        });
                    }
                    else {
                        let error: Error = new Error("oldPassword is wrong");
                        next(error);
                    }
                });
            }
            else {
                let error: Error = new Error("oldPassword and newPassword shouldn't be the same");
                next(error);
            }

        }

    }

    catch (error) { next(error) }

}

export const changeDoctorPassword: RequestHandler = async (request, response, next) => {

    try {
        let doctorData: any = await Doctor.findOne({ _id: (request as IMyRequest).id }, { _id: 0, password: 1 });
        if (doctorData == null) {
            next(new Error("doctor Old Password Is Incorrect"));
        }
        else {
            if (request.body.oldPassword != request.body.newPassword) {
                bcrypt.compare((request.body as { oldPassword: string }).oldPassword, doctorData.password).then(function (result: boolean): void {
                    if (result == true) {
                        bcrypt.hash(request.body.newPassword, salt, async function (err: any, hash: string) {
                            await Doctor.updateOne({ _id: (request as IMyRequest).id }, { $set: { password: hash } })
                            response.status(200).json({ data: "doctor password updated successfully" });
                        });
                    }
                    else {
                        let error: Error = new Error("oldPassword is wrong");
                        next(error);
                    }
                });
            }
            else {
                let error: Error = new Error("oldPassword and newPassword shouldn't be the same");
                next(error);
            }

        }

    }

    catch (error) { next(error) }

}

export const changeEmployeePassword: RequestHandler = async (request, response, next) => {

    try {
        let employeeData: any = await Employe.findOne({ _id: (request as IMyRequest).id }, { _id: 0, password: 1 });
        if (employeeData == null) {
            next(new Error("employee Old Password Is Incorrect"));
        }
        else {
            if (request.body.oldPassword != request.body.newPassword) {
                bcrypt.compare((request.body as { oldPassword: string }).oldPassword, employeeData.password).then(function (result: boolean): void {
                    if (result == true) {
                        bcrypt.hash(request.body.newPassword, salt, async function (err: any, hash: string) {
                            await Employe.updateOne({ _id: (request as IMyRequest).id }, { $set: { password: hash } })
                            response.status(200).json({ data: "employee password updated successfully" });
                        });
                    }
                    else {
                        let error: Error = new Error("oldPassword is wrong");
                        next(error);
                    }
                });
            }
            else {
                let error: Error = new Error("oldPassword and newPassword shouldn't be the same");
                next(error);
            }

        }

    }

    catch (error) { next(error) }

}

export const changeAdminPassword: RequestHandler = async (request, response, next) => {

    try {
        let adminData: any = await Admin.findOne({ _id: (request as IMyRequest).id }, { _id: 0, password: 1 });
        if (adminData == null) {
            next(new Error("admin Old Password Is Incorrect"));
        }
        else {
            if (request.body.oldPassword != request.body.newPassword) {
                bcrypt.compare((request.body as { oldPassword: string }).oldPassword, adminData.password).then(function (result: boolean): void {
                    if (result == true) {
                        bcrypt.hash(request.body.newPassword, salt, async function (err: any, hash: string) {
                            await Admin.updateOne({ _id: (request as IMyRequest).id }, { $set: { password: hash } })
                            response.status(200).json({ data: "admin password updated successfully" });
                        });
                    }
                    else {
                        let error: Error = new Error("oldPassword is wrong");
                        next(error);
                    }
                });
            }
            else {
                let error: Error = new Error("oldPassword and newPassword shouldn't be the same");
                next(error);
            }

        }

    }

    catch (error) { next(error) }

}