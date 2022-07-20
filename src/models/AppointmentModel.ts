import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

export interface Appointment {
  _id: Number;
  date: Date;
  doctorName: String;
  patientName: String;
  createdAt: Date;
  isScaned: Boolean;
}

const appointmentSchema = new Schema<Appointment>(
  {
    _id: { type: Number },
    date: {
      type: Date,
      default: Date.now,
    },
    doctorName: { type: String, required:[true, 'doctor name is required!'] },
    patientName: { type: String, required: [true, 'patient name is required!'] },
    createdAt: { type: Date, default: new Date},
    isScaned: { type: Boolean, default: false },
  },
  { id: false }
);
appointmentSchema.plugin(AutoIncrement, { id: "appointment_id" });
const appointment = model<Appointment>("appointments", appointmentSchema);
export default appointment;
