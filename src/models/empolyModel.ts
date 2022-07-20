import mongoose, { Schema, model, connect, ObjectId, Types } from 'mongoose';
const AutoIncrement = require("mongoose-sequence")(mongoose);

// 1. Create an interface representing a document in MongoDB.
export interface Employee {
    _id: Number;
    fullName: String;
    email: String;
    password: String;
    address: {city:String,street:String,building:Number};
    mobile: Number;
    salary: Number;
    role: String;
};
export interface Address {
    _id: number;
    city: string;
    street: string;
    building: number;
}
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const addressSchema = new Schema<Address>({
    _id: { required:false},
    city:{
        type:String,
    },
    street:{
        type:String,
    }, 
    building:{
        type:Number,
    },
});
const employeSchema = new Schema<Employee>({
    _id: Number,
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address:{
        type:addressSchema,
        required:true
    },
    mobile:Number,
    salary: Number,
    role: {type : String, default:'employee'},  
  });
  employeSchema.plugin(AutoIncrement, {id: 'employe_id_counter',inc_field: '_id' });
// 3. Create a Model.
const Employe = model<Employee>('Employee', employeSchema);
export default Employe;
