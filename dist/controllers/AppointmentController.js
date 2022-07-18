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
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const AppointmentModel_1 = __importDefault(require("../models/AppointmentModel"));
const getAllAppointments = (request, response, next) => {
    AppointmentModel_1.default
        .find({})
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (request, response, next) => {
    AppointmentModel_1.default
        .findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null) {
            next(new Error("Appointment not found"));
        }
        else
            response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAppointmentById = getAppointmentById;
const createAppointment = (request, response, next) => {
    let object = new AppointmentModel_1.default({
        doctorName: request.body.doctorName,
        patientName: request.body.patientName,
        date: request.body.date
    });
    object
        .save()
        .then(() => {
        response.status(201).json({ data: "Appointment Added Successfully" });
    })
        .catch((error) => next(error));
};
exports.createAppointment = createAppointment;
const updateAppointment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield AppointmentModel_1.default.findOne({ _id: request.body._id });
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
        response.status(200).json({ data: "Appointment data updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (request, response, next) => {
    AppointmentModel_1.default.deleteOne({ _id: request.params.id }, {})
        .then(data => {
        if (data == null) {
            next(new Error('Appointment not found'));
        }
        else
            response.status(200).json({ data: 'Appointment deleted successfully' });
    })
        .catch(error => {
        next(error);
    });
};
exports.deleteAppointment = deleteAppointment;
