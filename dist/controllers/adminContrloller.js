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
exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAdminById = exports.getAllAdmins = void 0;
const adminModel_1 = __importDefault(require("./../models/adminModel"));
// const bcrypt = require('bcrypt');
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(8);
// let Admin = mongoose.model('Admin');
const getAllAdmins = (request, response, next) => {
    adminModel_1.default.find({})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => {
        next(error);
    });
};
exports.getAllAdmins = getAllAdmins;
const getAdminById = (request, response, next) => {
    adminModel_1.default.findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null) {
            next(new Error('Admin not found'));
        }
        else {
            response.status(200).json(data);
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAdminById = getAdminById;
const createAdmin = (request, response, next) => {
    // bcrypt.hash((request.body as {password:String}).password, function (error: any, hash: any) {
    let object = new adminModel_1.default({
        _id: request.body.id,
        fullName: request.body.fullName,
        email: request.body.email,
        password: request.body.password,
        mobile: request.body.mobile,
        role: request.body.role,
    });
    object.save()
        .then((data) => {
        response.status(201).json({ data: "Admin data added successfully" });
    }).catch((error) => next(error));
    //});
};
exports.createAdmin = createAdmin;
const updateAdmin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield adminModel_1.default.findOne({ _id: request.body.id });
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
        response.status(200).json({ data: 'updated' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (request, response, next) => {
    adminModel_1.default.deleteOne({ _id: request.params.id }, {})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => next(error));
};
exports.deleteAdmin = deleteAdmin;
