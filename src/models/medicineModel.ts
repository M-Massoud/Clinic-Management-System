import mongoose, { Schema, model, connect } from 'mongoose';

import Inc from 'mongoose-sequence';
//@ts-ignore
const AutoIncrement = Inc(mongoose);

// 1. Create an interface representing a document in MongoDB.
interface Imedicine {
  _id: number;
  title: string;
  price: number;
  description: string;
}

// 2. Create a Schema corresponding to the document interface.
const medicineSchema = new Schema<Imedicine>({
  _id: Number,
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

//@ts-ignore
medicineSchema.plugin(AutoIncrement, { id: 'medicineCounter' });

export default model<Imedicine>('medicines', medicineSchema);
