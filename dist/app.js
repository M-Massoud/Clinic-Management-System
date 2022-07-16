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
require('dotenv/config');
// const loginRoute = import("./routes/login");
const server = (0, express_1.default)();
const port = 8080;
mongoose_1.default.connect(process.env.DB_URL)
    .then(() => {
    console.log("DB Connected");
    server.listen(process.env.port || port);
})
    .catch((error) => console.log("Db Connection Error " + error));
//a- Middleware to write request url and method
server.use((0, morgan_1.default)(':method :url'));
// b- Middle ware for CORS Package to allow Users reach your site.
server.use((0, cors_1.default)());
// routes
server.use(express_1.default.json());
// server.use(loginRoute);
server.use(adminRoute_1.default);
server.use(reportRoute_1.default);
server.use(employRoute_1.default);
// c- General middleware for not Found url pathes with 404 status code.
server.use((request, response) => {
    response.status(404).send("Page Not Found");
});
// d- One Error handling middleware
// @ts-ignore
server.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({ message: "Internal Error" + error });
});
