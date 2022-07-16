"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const reportSchema = new mongoose_1.Schema({
    _id: Number,
    invoiceReport: { type: String, required: true },
    appointmentReport: { type: String, required: true },
});
// 3. Create a Model.
const Report = (0, mongoose_1.model)('Admin', reportSchema);
module.exports = Report;
