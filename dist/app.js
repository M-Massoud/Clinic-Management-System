"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// remove at deployment
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require('mongoose');
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
// const adminRoute = require('./routes/adminRoute');
const reportRoute_1 = __importDefault(require("./routes/reportRoute"));
const employRoute_1 = __importDefault(require("./routes/employRoute"));
// need edit later
// import dotenv from "dotenv";
// dotenv.config()
require("dotenv/config");
// import routes
const clinicRoute_1 = __importDefault(require("./routes/clinicRoute"));
const medicineRoute_1 = __importDefault(require("./routes/medicineRoute"));
const DoctorRoute_1 = __importDefault(require("./routes/DoctorRoute"));
const AppointmentRoute_1 = __importDefault(require("./routes/AppointmentRoute"));
// const loginRoute = import("./routes/login");
// const loginRoute = import("./routes/login");
const server = (0, express_1.default)();
const port = 8080;
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => {
    console.log('DB Connected');
    // connect to the server
    server.listen(process.env.port || port, () => {
        console.log('server is up and currently listening');
    });
})
    .catch((error) => console.log('Db Connection Error ' + error));
// import dotenv from "./env";
// dotenv.config();
require("dotenv/config");
// import { strict as assert } from 'assert';
// import { load } from 'ts-dotenv';
const patientRoute_1 = __importDefault(require("./routes/patientRoute"));
const billsRoute_1 = __importDefault(require("./routes/billsRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
// const env = load({
//     DB_URL: String,
//     secret_Key: String,
//     saltRounds: Number,
// });
// mongoose.connect(process.env.DB_URL as string)
//     .then(() => {
//         console.log("DB Connected")
//         server.listen(process.env.port as string || port);
//     })
//     .catch((error: Error) => console.log("Db Connection Error " + error))
//a- Middleware to write request url and method
server.use((0, morgan_1.default)(':method :url'));
// b- Middle ware for CORS Package to allow Users reach your site.
server.use((0, cors_1.default)());
// routes
server.use(express_1.default.json());
server.use(clinicRoute_1.default);
server.use(medicineRoute_1.default);
// server.use(loginRoute);
server.use(DoctorRoute_1.default);
server.use(AppointmentRoute_1.default);
// c- General middleware for not Found url pathes with 404 status code.
server.use((request, response) => {
    response.status(404).send('Page Not Found');
});
server.use(adminRoute_1.default);
server.use(reportRoute_1.default);
server.use(employRoute_1.default);
// c- General middleware for not Found url pathes with 404 status code.
server.use((request, response) => {
    response.status(404).send('Page Not Found');
});
// d- One Error handling middleware
// @ts-ignore
// server.use(
//   // @ts-ignore
//   (error, request: Request, response: Response, next: NextFunction) => {
server.use(loginRoute_1.default);
server.use(patientRoute_1.default);
server.use(billsRoute_1.default);
// c- General middleware for not Found url pathes with 404 status code.
server.use((request, response) => {
    response.status(404).send('Page Not Found');
});
// d- One Error handling middleware
server.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({ message: 'Internal Error' + error });
});
