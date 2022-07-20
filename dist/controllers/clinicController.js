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
exports.deleteClinic = exports.getClinicById = exports.updateClinic = exports.createNewClinic = exports.getAllClinics = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const clinicModel_1 = __importDefault(require("../models/clinicModel"));
const getAllClinics = (request, response, next) => {
    // console.log(request.query);
    // console.log(request.params);
    let clinicData;
    // filtering clinics by speciality
    // expected url http://localhost:8080/clinic?speciality=dentistry
    if (request.query.speciality) {
        clinicData = clinicModel_1.default.find({ speciality: request.query.speciality })
            .populate({ path: 'doctors', select: 'fullName' })
            .populate({ path: 'medicines', select: 'title description price' })
            .populate({ path: 'reports', select: 'invoiceReport appointmentReport' })
            .populate({ path: 'patients', select: 'fullName' })
            .populate({ path: 'employees', select: 'fullName' });
    }
    else {
        clinicData = clinicModel_1.default.find({})
            .populate({ path: 'doctors', select: 'fullName' })
            .populate({ path: 'medicines', select: 'title description price' })
            .populate({ path: 'reports', select: 'invoiceReport appointmentReport' })
            .populate({ path: 'patients', select: 'fullName' })
            .populate({ path: 'employees', select: 'fullName' });
    }
    // sorting by medicine name
    // expected url http://localhost:8080/clinic?speciality=dentistry&sortByName=asc
    // http://localhost:8080/medicine?filterByPrice=yes&greater=10&lesser=900&sortByPrice=asc
    if (request.query.sortByName) {
        if (request.query.sortByName == 'asc')
            clinicData.sort({ name: 1 });
        else if (request.query.sortByName == 'des') {
            clinicData.sort({ name: -1 });
        }
    }
    clinicData
        .then(data => {
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.getAllClinics = getAllClinics;
const createNewClinic = function (request, response, next) {
    bcrypt_1.default.hash(request.body.password, 8, function (err, hash) {
        let clinic = new clinicModel_1.default({
            name: request.body.name,
            mobile: request.body.mobile,
            email: request.body.email,
            password: hash,
            'address.city': request.body.address.city,
            'address.street': request.body.address.street,
            'address.building': request.body.address.building,
            speciality: request.body.speciality,
            doctors: request.body.doctors,
            medicines: request.body.medicines,
            reports: request.body.reports,
            employees: request.body.employees,
            patients: request.body.patients,
        });
        clinic
            .save()
            .then(data => {
            response.status(201).json({ data: 'added' + data });
        })
            .catch(error => next(error));
    });
};
exports.createNewClinic = createNewClinic;
const updateClinic = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield clinicModel_1.default.findOne({ _id: request.body.id });
        for (let key in request.body) {
            // check if key is object type
            if (request.body[key].constructor.name == 'Object') {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            }
            else {
                data[key] = request.body[key];
            }
            yield data.save();
            response.status(200).json({ data: 'clinic updated successfully' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateClinic = updateClinic;
const getClinicById = (request, response, next) => {
    clinicModel_1.default.findOne({ _id: request.params.id })
        .then(data => {
        if (data == null)
            next(new mongoose_1.Error('clinic cannot be found'));
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.getClinicById = getClinicById;
const deleteClinic = (request, response, next) => {
    clinicModel_1.default.findByIdAndDelete({ _id: request.params.id })
        .then(data => {
        if (data == null)
            next(new mongoose_1.Error('needed clinic cannot be deleted'));
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.deleteClinic = deleteClinic;
