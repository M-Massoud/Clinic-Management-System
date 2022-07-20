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
exports.deleteEmploye = exports.updateEmploye = exports.createEmploye = exports.getEmployeById = exports.getAllEmploye = void 0;
const empolyModel_1 = __importDefault(require("./../models/empolyModel"));
// const bcrypt = require('bcrypt');
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(8);
// let Admin = mongoose.model('Admin');
const getAllEmploye = (request, response, next) => {
    empolyModel_1.default.find({})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => {
        next(error);
    });
};
exports.getAllEmploye = getAllEmploye;
const getEmployeById = (request, response, next) => {
    empolyModel_1.default.findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null) {
            next(new Error('Employe not found'));
        }
        else {
            response.status(200).json(data);
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.getEmployeById = getEmployeById;
const createEmploye = (request, response, next) => {
    bcrypt_1.default.hash(request.body.password, salt, function (error, hash) {
        let object = new empolyModel_1.default({
            _id: request.body.id,
            fullName: request.body.fullName,
            email: request.body.email,
            password: hash,
            address: request.body.address,
            salary: request.body.salary,
            mobile: request.body.mobile,
            role: request.body.role,
        });
        object.save()
            .then((data) => {
            response.status(201).json({ data: "Employe data added successfully" });
        }).catch((error) => next(error));
    });
};
exports.createEmploye = createEmploye;
const updateEmploye = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield empolyModel_1.default.findOne({ _id: request.body.id });
        for (const key in request.body) {
            if (typeof request.body[key] == 'object') {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            }
            else
                data[key] = request.body[key];
        }
        yield data.save();
        response.status(200).json({ data: 'Employe data updated' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateEmploye = updateEmploye;
const deleteEmploye = (request, response, next) => {
    empolyModel_1.default.deleteOne({ _id: request.params.id }, {})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => next(error));
};
exports.deleteEmploye = deleteEmploye;
