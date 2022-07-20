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
exports.deleteMedicine = exports.getMedicineById = exports.updateMedicine = exports.addNewMedicine = exports.getAllMedicines = void 0;
const mongoose_1 = require("mongoose");
const medicineModel_1 = __importDefault(require("../models/medicineModel"));
const getAllMedicines = (request, response, next) => {
    // filtering data by price in range
    // expected url
    // http://localhost:8080/medicine?filterByPrice=yes&greater=100&lesser=1200
    let medicineData = request.query.filterByPrice
        ? medicineModel_1.default.find({
            price: { $gte: request.query.greater, $lte: request.query.lesser },
        })
        : medicineModel_1.default.find();
    // sorting by price
    // expected url http://localhost:8080/medicine?sortByPrice=des
    if (request.query.sortByPrice) {
        if (request.query.sortByPrice == 'asc')
            medicineData.sort({ price: 1 });
        else if (request.query.sortByPrice == 'des') {
            medicineData.sort({ price: -1 });
        }
    }
    // sorting by medicine name
    if (request.query.sortByName) {
        if (request.query.sortByName == 'asc')
            medicineData.sort({ title: 1 });
        else if (request.query.sortByName == 'des') {
            medicineData.sort({ title: -1 });
        }
    }
    medicineData
        .then(data => {
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.getAllMedicines = getAllMedicines;
const addNewMedicine = function (request, response, next) {
    let medicine = new medicineModel_1.default({
        title: request.body.title,
        price: request.body.price,
        description: request.body.description,
    });
    medicine
        .save()
        .then(data => {
        response.status(201).json({ data: 'added' + data });
    })
        .catch(error => next(error));
};
exports.addNewMedicine = addNewMedicine;
const updateMedicine = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield medicineModel_1.default.findOne({ _id: request.body.id });
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
        response.status(200).json({ data: 'medicine Updated Successfully' + data });
    }
    catch (error) {
        next(error);
    }
});
exports.updateMedicine = updateMedicine;
const getMedicineById = (request, response, next) => {
    medicineModel_1.default.findOne({ _id: request.params.id })
        .then(data => {
        if (data == null)
            next(new mongoose_1.Error('medicine cannot be found'));
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.getMedicineById = getMedicineById;
const deleteMedicine = (request, response, next) => {
    medicineModel_1.default.findByIdAndDelete({ _id: request.params.id })
        .then(data => {
        if (data == null)
            next(new mongoose_1.Error('needed medicine cannot be deleted'));
        response.status(200).json(data);
    })
        .catch(error => {
        next(error);
    });
};
exports.deleteMedicine = deleteMedicine;
