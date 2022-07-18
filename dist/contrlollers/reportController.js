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
const Report = require('./../models/reportModel');
// const bcrypt = require('bcrypt');
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(8);
// let Admin = mongoose.model('Admin');
module.exports.getAllAdmins = (request, response, next) => {
    Admin.find({})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => {
        next(error);
    });
};
module.exports.getAdminById = (request, response, next) => {
    Admin.findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null)
            next(new Error('Admin not found'));
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
module.exports.createAdmin = (request, response, next) => {
    // bcrypt.hash(request.body.password, function (error: any, hash: any) {
    let object = new Admin({
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
module.exports.updateAdmin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Admin.findOne({ _id: request.body.id });
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
module.exports.deleteAdmin = (request, response, next) => {
    Admin.deleteOne({ _id: request.params.id }, {})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => next(error));
};
