import mongoose, { Schema, Document } from 'mongoose';
import Inc from "mongoose-sequence";
//@ts-ignore
const AutoIncrement = Inc(mongoose);

export interface IPatient extends Document {
    _id: Number,
    fullName: String,
    email: String,
    password: String,
    mobile: Number,
    address?: { city: String, street: String, building: Number },
    appointments?: Array<Number>,
    potions?: Array<{ medicineId: Number, usageDescription: String }>,
    payment?: { cardType: String, cardNumber: Number },
    bills?: Array<Number>,
    role: String,
}

// interface IAddress extends Document {
//     city: String,
//     street: String,
//     building: Number,
// }

const addressSchema: Schema = new mongoose.Schema({

    _id: { required: false },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    building: {
        type: Number,
    },
});

const paymentSchema: Schema = new mongoose.Schema({

    _id: { required: false },
    cardType: {
        type: String,
        enum: ['visa', 'mastercard', 'meza'],
        default: 'visa',
    },
    cardNumber: {
        type: Number,
        unique: true
    },
});

const potionsSchema: Schema = new mongoose.Schema({

    _id: { required: false },
    medicineId: {
        type: Number,
    },
    usageDescription: {
        type: String,
    },
});

const schema: Schema = new mongoose.Schema<IPatient>({

    _id: {
        type: Number,
    },
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: addressSchema,
    },
    bills: {
        type: [{ type: Number }],
        ref: "bills"
    },
    appointments: {
        type: [{ type: Number }],
        // ref: "products"
    },
    payment: {
        type: paymentSchema,
    },
    potions: {
        type: [{ type: potionsSchema }],
    },
    role: {
        type: String,
        required: true,
        default: "patient",
    },
})
//@ts-ignore
schema.plugin(AutoIncrement, { id: 'patient-id' });

export default mongoose.model<IPatient>("patients", schema);