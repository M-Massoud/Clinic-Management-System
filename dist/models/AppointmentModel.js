"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const AutoIncrement = require("mongoose-sequence")(mongoose_2.default);
const appointmentSchema = new mongoose_1.Schema({
    _id: { type: Number },
    date: {
        type: Date,
        default: Date.now,
    },
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
}, { id: false });
appointmentSchema.plugin(AutoIncrement, { id: "appointment_id" });
const appointment = (0, mongoose_1.model)("appointments", appointmentSchema);
exports.default = appointment;
