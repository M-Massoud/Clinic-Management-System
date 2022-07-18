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
  doctors: number[];
  medicine: number[];
  employees: number[];
  report: number[];
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
  medicine: {
    type: [Number],
    ref: 'medicines',
  },
});

export default mongoose.model<ClinicInterface>('clinics', clinicSchema);
