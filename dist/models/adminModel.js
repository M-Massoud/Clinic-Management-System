"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const adimSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: Number,
    role: { type: String, default: 'admin' },
});
// 3. Create a Model.
const Admin = (0, mongoose_1.model)('Admin', adimSchema);
exports.default = Admin;
// run().catch(err => console.log(err));
// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://localhost:27017/clinc');
//   const admin = new Admin({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await admin.save();
//   console.log(admin.email); // 'bill@initech.com'
// }
//setter
// mongoose.model('admin', adimSchema);
// // A- craete schema object
// const schema = new mongoose.Schema({
//   _id: { type: mongoose.Types.ObjectId, auto: true },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
