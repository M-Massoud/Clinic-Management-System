"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AutoIncrement = require("mongoose-sequence")(mongoose_1.default);
;
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const addressSchema = new mongoose_1.Schema({
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
const employeSchema = new mongoose_1.Schema({
    _id: Number,
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        type: addressSchema,
        required: true
    },
    mobile: Number,
    salary: Number,
    role: String,
});
employeSchema.plugin(AutoIncrement, { id: 'employe_id_counter', inc_field: '_id' });
// 3. Create a Model.
const Employe = (0, mongoose_1.model)('Employee', employeSchema);
exports.default = Employe;
