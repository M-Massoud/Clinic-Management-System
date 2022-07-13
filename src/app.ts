import express from 'express';
// remove at deployment
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// need edit later
// import dotenv from "dotenv";
// dotenv.config()
import 'dotenv/config'

// const loginRoute = import("./routes/login");


const server = express();
const port: number = 8080;

mongoose.connect(process.env.DB_URL as string)
    .then(() => {
        console.log("DB Connected")
        server.listen(process.env.port || port);
    })
    .catch((error: any) => console.log("Db Connection Error " + error))

//a- Middleware to write request url and method
server.use(morgan(':method :url'));

// b- Middle ware for CORS Package to allow Users reach your site.
server.use(cors());

// routes
server.use(express.json());
// server.use(loginRoute);



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


