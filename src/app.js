"use strict";
exports.__esModule = true;
require("webrtc");
var express_1 = require("express");
// remove at deployment
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
// need edit later
// import dotenv from "dotenv";
// dotenv.config()
require("dotenv/config");
// const loginRoute = import("./routes/login");
var server = (0, express_1["default"])();
var port = 8080;
//@ts-ignore
mongoose_1["default"]
    .connect(process.env.DB_URL)
    .then(function () {
    console.log('DB Connected');
    server.listen(process.env.port || port);
})["catch"](function (error) { return console.log('Db Connection Error ' + error); });
//a- Middleware to write request url and method
server.use((0, morgan_1["default"])(':method :url'));
// b- Middle ware for CORS Package to allow Users reach your site.
server.use((0, cors_1["default"])());
// routes
server.use(express_1["default"].json());
// server.use(loginRoute);
// c- General middleware for not Found url pathes with 404 status code.
server.use(function (request, response) {
    response.status(404).send('Page Not Found');
});
// d- One Error handling middleware
server.use(function (error, request, response, next) {
    var status = error.status || 500;
    response.status(status).json({ message: 'Internal Error' + error });
});
