import mongoose, { Schema, Document, Date } from 'mongoose';
import Inc from "mongoose-sequence";
//@ts-ignore
const AutoIncrement = Inc(mongoose);

export interface IBills extends Document {
    _id: Number,
    paymentMethod: String,
    patientId: Number,
    date: Date,
    price: Number,
}

const schema: Schema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit card', 'insurance'],
        default: 'credit card',
        required:true,
    },
    patientId: {
        type: Number,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required:true,
    },
})
//@ts-ignore
schema.plugin(AutoIncrement, { id: 'bill-id' });

export default mongoose.model<IBills>("bills", schema);