import { Schema, model, connect, ObjectId, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Admini {
  _id: Types.ObjectId;
  fullName: String;
  email: String;
  password: String;
  mobile: Number;
  role: String;
}
// 2. Create a Schema corresponding to the document interface.
// mongoose.Types.ObjectId
const adimSchema = new Schema<Admini>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: Number,
  role: { type: String, default: 'admin' },
});

// 3. Create a Model.
const Admin = model<Admini>('Admin', adimSchema);
export default Admin;
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
