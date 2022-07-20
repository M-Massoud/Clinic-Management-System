"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.highSalaryDoctors = exports.lessSalaryDoctors = exports.sortLowSalaryDoctors = exports.sortHighSalaryDoctors = exports.deleteDoctorAppointmentById = exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctorById = exports.getAllDoctors = void 0;
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
// import { Request, Response,NextFunction } from "express";
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(8);
// let doctor = mongoose.model("doctor");
const getAllDoctors = (request, response, next) => {
    DoctorModel_1.default.find({}).populate('Appointment')
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAllDoctors = getAllDoctors;
const getDoctorById = (request, response, next) => {
    DoctorModel_1.default.findOne({ _id: request.params.id }).populate('Appointment')
        .then((data) => {
        if (data == null) {
            next(new Error("Doctor not found"));
        }
        else
            response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getDoctorById = getDoctorById;
const createDoctor = (request, response, next) => {
    bcrypt_1.default.hash(request.body.password, salt, function (err, hash) {
        let object = new DoctorModel_1.default({
            fullName: request.body.fullName,
            mobile: request.body.mobile,
            password: hash,
            email: request.body.email,
            Appointment: request.body
                .Appointment,
            role: request.body.role,
            salary: request.body.salary,
            address: request.body.address,
        });
        object
            .save()
            .then(() => {
            response.status(201).json({ data: "Doctor Added Successfully" });
        })
            .catch((error) => next(error));
    });
};
exports.createDoctor = createDoctor;
const updateDoctor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DoctorModel_1.default.findOne({ _id: request.body._id });
        for (const key in request.body) {
            if (typeof request.body[key] == "object") {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            }
            else
                data[key] = request.body[key];
        }
        yield data.save();
        response.status(200).json({ data: "Doctor data updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDoctor = updateDoctor;
const deleteDoctor = (request, response, next) => {
    DoctorModel_1.default.deleteOne({ _id: request.params.id }, {})
        .then(data => {
        if (data == null) {
            next(new Error('Doctor not found'));
        }
        else
            response.status(200).json({ data: 'Doctor deleted successfully' });
    })
        .catch(error => {
        next(error);
    });
};
exports.deleteDoctor = deleteDoctor;
const deleteDoctorAppointmentById = (request, response, next) => {
    DoctorModel_1.default.updateOne({ _id: request.params.id }, { $pull: { Appointment: { $in: request.body.Appointment } } })
        .then(data => {
        if (data == null) {
            next(new Error('Appointment not found'));
        }
        else {
            response.status(200).json({ data: 'Appointment removed successfully' });
        }
    })
        .catch(error => {
        next(error);
    });
};
exports.deleteDoctorAppointmentById = deleteDoctorAppointmentById;
// highsalary
const sortHighSalaryDoctors = (request, response, next) => {
    DoctorModel_1.default.find({}, { fullName: 1, salary: 1, email: 1, mobile: 1, address: 1 }).sort({ salary: -1 })
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.sortHighSalaryDoctors = sortHighSalaryDoctors;
//lowsalary
const sortLowSalaryDoctors = (request, response, next) => {
    DoctorModel_1.default.find({}, { fullName: 1, salary: 1, email: 1, mobile: 1, address: 1 }).sort({ salary: 1 })
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.sortLowSalaryDoctors = sortLowSalaryDoctors;
//less than salary
const lessSalaryDoctors = (request, response, next) => {
    DoctorModel_1.default.find({ salary: { $lt: request.params.key } }, { password: 0, role: 0, Appointment: 0 })
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.lessSalaryDoctors = lessSalaryDoctors;
// highs than alary
const highSalaryDoctors = (request, response, next) => {
    DoctorModel_1.default.find({ salary: { $gt: request.params.key } }, { password: 0, role: 0, Appointment: 0 })
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.highSalaryDoctors = highSalaryDoctors;
