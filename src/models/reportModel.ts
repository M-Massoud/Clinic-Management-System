import mongoose, { Schema, model, connect, ObjectId, Types } from 'mongoose';
const AutoIncrement = require("mongoose-sequence")(mongoose);

// 1. Create an interface representing a document in MongoDB.
export interface Report {
    _id: Number;
    invoiceReport: String;
    appointmentReport: String;
};
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const reportSchema = new Schema<Report>({
    _id: Number,
    invoiceReport: { type: String, required: true },
    appointmentReport: { type: String, required: true },
});
reportSchema.plugin(AutoIncrement, {id: 'report_id_counter',inc_field: '_id' });

// 3. Create a Model.
const Report = model<Report>('Report', reportSchema);
export default Report;
