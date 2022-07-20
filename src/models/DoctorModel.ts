import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);
import uniqueValidator from 'mongoose-unique-validator';
export interface IDoctor {
  _id: Number;
  fullName: String;
  mobile: Number;
  email: String;
  password: String;
  address?: { city: String; street: String; building: Number };
  Appointment?: Array<Number>;
  role: String;
  salary?: Number;
}

const doctorSchema = new Schema<IDoctor>(
  {
    _id: { type: Number },
    fullName: { type: String, required: [true, 'doctor name is required!'],unique: true },
    mobile: { type: Number, required: [true, 'mobile number is required!'], unique: true },
    email: { type: String, required: [true, 'email  is required!'], unique: true },
    password: { type: String, required: [true, 'password  is required!'] },
    Appointment: {
      type: [{ type: Number }],
      ref: "appointments"
    },
    role: { type: String,default:'doctor' },
    salary: { type: Number },
    address: { city: String, street: String, building: Number },
  },
  { id: false }
);
doctorSchema.plugin(uniqueValidator).plugin(AutoIncrement, { id: "doctor_id" });
const Doctor = model<IDoctor>("doctor", doctorSchema);
export default Doctor;
