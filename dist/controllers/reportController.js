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
exports.deleteReport = exports.updateReport = exports.createReport = exports.getReportById = exports.getAllReport = void 0;
const reportModel_1 = __importDefault(require("./../models/reportModel"));
const getAllReport = (request, response, next) => {
    reportModel_1.default.find({})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => {
        next(error);
    });
};
exports.getAllReport = getAllReport;
const getReportById = (request, response, next) => {
    reportModel_1.default.findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null) {
            next(new Error('Report not found'));
        }
        else {
            response.status(200).json(data);
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.getReportById = getReportById;
const createReport = (request, response, next) => {
    // bcrypt.hash(request.body.password, function (error: any, hash: any) {
    let object = new reportModel_1.default({
        _id: request.body.id,
        invoiceReport: request.body.invoiceReport,
        appointmentReport: request.body.appointmentReport,
    });
    object.save()
        .then((data) => {
        response.status(201).json({ data: "Report data added successfully" });
    }).catch((error) => next(error));
    //});
};
exports.createReport = createReport;
const updateReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield reportModel_1.default.findOne({ _id: request.body.id });
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
        response.status(200).json({ data: 'Report data updated' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateReport = updateReport;
const deleteReport = (request, response, next) => {
    reportModel_1.default.deleteOne({ _id: request.params.id }, {})
        .then((data) => {
        response.status(200).json(data);
    }).catch((error) => next(error));
};
exports.deleteReport = deleteReport;
