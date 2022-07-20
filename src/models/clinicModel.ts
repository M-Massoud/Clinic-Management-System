import mongoose, { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ClinicInterface {
  name: string;
  mobile: string;
  email: string;
  password: string;
  address: {
    city: string;
    street: string;
    building: number;
  };
  speciality: string;
  doctors: number[];
  medicines: number[];
  employees: number[];
  reports: number[];
  patients: number[];
}

// 2. Create a Schema corresponding to the document interface.
const clinicSchema = new Schema<ClinicInterface>({
  name: { type: String, required: true },
  mobile: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  address: {
    city: String,
    street: String,
    building: Number,
  },

  speciality: {
    type: String,
    enum: ['dentistry', 'general', 'nutrition', 'psychiatry'],
    default: 'general',
  },

  medicines: {
    type: [Number],
    ref: 'medicines',
  },
  doctors: {
    type: [Number],
    ref: 'doctor',
  },
  reports: {
    type: [Number],
    ref: 'Report',
  },
  employees: {
    type: [Number],
    ref: 'Employee',
  },
  patients: {
    type: [Number],
    ref: 'patients',
  },
});

export default mongoose.model<ClinicInterface>('clinics', clinicSchema);
