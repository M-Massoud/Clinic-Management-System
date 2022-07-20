"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const AutoIncrement = require("mongoose-sequence")(mongoose_2.default);
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const doctorSchema = new mongoose_1.Schema({
    _id: { type: Number },
    fullName: { type: String, required: [true, 'doctor name is required!'], unique: true },
    mobile: { type: Number, required: [true, 'mobile number is required!'], unique: true },
    email: { type: String, required: [true, 'email  is required!'], unique: true },
    password: { type: String, required: [true, 'password  is required!'] },
    Appointment: {
        type: [{ type: Number }],
        ref: "appointments"
    },
    role: { type: String, default: 'doctor' },
    salary: { type: Number },
    address: { city: String, street: String, building: Number },
}, { id: false });
doctorSchema.plugin(mongoose_unique_validator_1.default).plugin(AutoIncrement, { id: "doctor_id" });
const Doctor = (0, mongoose_1.model)("doctor", doctorSchema);
exports.default = Doctor;
