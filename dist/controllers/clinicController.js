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
const clinicModel_1 = __importDefault(require("../models/clinicModel"));
const getAllClinics = (request, response, next) => {
    // console.log(request.query);
    // console.log(request.params);
    clinicModel_1.default.find({})
        .populate({ path: 'medicine', select: 'title description price' })
        .then(data => {
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.getAllClinics = getAllClinics;
const createNewClinic = function (request, response, next) {
    let clinic = new clinicModel_1.default({
        name: request.body.name,
        mobile: request.body.mobile,
        email: request.body.email,
        password: request.body.password,
        'address.city': request.body.address.city,
        'address.street': request.body.address.street,
        'address.building': request.body.address.building,
        medicine: request.body.medicine,
    });
    clinic
        .save()
        .then(data => {
        response.status(201).json({ data: 'added' + data });
    })
        .catch(error => next(error));
};
exports.createNewClinic = createNewClinic;
const updateClinic = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield clinicModel_1.default.findOne({ _id: request.body.id });
        for (let key in request.body) {
            // console.log(key);
            if (request.body[key].constructor.name == 'Array') {
                for (let item in request.body[key]) {
                    data[key].push(request.body[key][item]);
                }
            }
            else
                data[key] = request.body[key];
        }
        yield data.save();
        response.status(200).json({ data: 'clinic Updated Successfully' + data });
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
