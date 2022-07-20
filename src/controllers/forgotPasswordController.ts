import { RequestHandler } from "express";
import Patient from "../models/patientModel";
import Doctor from "../models/DoctorModel";
import Employe from './../models/empolyModel';
import Admin from './../models/adminModel';
import bcrypt from "bcrypt";

const salt: string = bcrypt.genSaltSync(Number(process.env.saltRounds as string));

export const forgotPatientPassword: RequestHandler = async (request, response, next) => {
    try {
        let patientData: any = await Patient.findOne(
            { fullName: (request.body as { fullName: string }).fullName, email: (request.body as { email: string }).email, mobile: (request.body as { mobile: string }).mobile },
            { password: 1 });
        if (patientData == null) {
            next(new Error("Patient Data Is Incorrect"));
        }
        else {
            bcrypt.hash((request.body as { newPassword: string }).newPassword, Number(salt), async function (err: any, hash: string) {
                await Patient.updateOne({ _id: patientData._id }, { $set: { password: hash } })
                response.status(200).json({ data: "patient password updated successfully" });
            });

        }

    }

    catch (error: any) { next(error) }
}

export const forgotDoctorPassword: RequestHandler = async (request, response, next) => {
    try {
        let doctorData: any = await Doctor.findOne(
            { fullName: (request.body as { fullName: string }).fullName, email: (request.body as { email: string }).email, mobile: (request.body as { mobile: string }).mobile },
            { password: 1 });
            if (doctorData == null) {
                next(new Error("doctor Data Is Incorrect"));
            }
            else {
                bcrypt.hash((request.body as { newPassword: string }).newPassword, Number(salt), async function (err: any, hash: string) {
                    await Doctor.updateOne({ _id: doctorData._id }, { $set: { password: hash } })
                response.status(200).json({ data: "doctor password updated successfully" });
            });

        }

    }

    catch (error: any) { next(error) }
}

export const forgotEmployeePassword: RequestHandler = async (request, response, next) => {
    try {
        let employeeData: any = await Employe.findOne(
            { fullName: (request.body as { fullName: string }).fullName, email: (request.body as { email: string }).email, mobile: (request.body as { mobile: string }).mobile },
            { password: 1 });
        if (employeeData == null) {
            next(new Error("employee Data Is Incorrect"));
        }
        else {
            bcrypt.hash((request.body as { newPassword: string }).newPassword, Number(salt), async function (err: any, hash: string) {
                await Employe.updateOne({ _id: employeeData._id }, { $set: { password: hash } })
                response.status(200).json({ data: "employee password updated successfully" });
            });

        }

    }

    catch (error: any) { next(error) }
}
export const forgotAdminPassword: RequestHandler = async (request, response, next) => {
    try {
        let adminData: any = await Admin.findOne(
            { fullName: (request.body as { fullName: string }).fullName, email: (request.body as { email: string }).email, mobile: (request.body as { mobile: string }).mobile },
            { password: 1 });
        if (adminData == null) {
            next(new Error("admin Data Is Incorrect"));
        }
        else {
            bcrypt.hash((request.body as { newPassword: string }).newPassword, Number(salt), async function (err: any, hash: string) {
                await Admin.updateOne({ _id: adminData._id }, { $set: { password: hash } })
                response.status(200).json({ data: "admin password updated successfully" });
            });

        }

    }

    catch (error: any) { next(error) }
}