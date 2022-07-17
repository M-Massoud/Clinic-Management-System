import express, { Request, Response, NextFunction } from 'express';
// remove at deployment
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// need edit later
// import dotenv from "dotenv";
// dotenv.config()
// import dotenv from "./env";
// dotenv.config();
import 'dotenv/config';
// import { strict as assert } from 'assert';
// import { load } from 'ts-dotenv';
import patientRoute from "./routes/patientRoute";
import billsRoute from "./routes/billsRoute";
import loginRoute from "./routes/loginRoute";
// const env = load({
//     DB_URL: String,
//     secret_Key: String,
//     saltRounds: Number,
// });
const server = express();
const port: number = 8080;

mongoose.connect(process.env.DB_URL as string)
    .then(() => {
        console.log("DB Connected")
        server.listen(process.env.port as string || port);
    })
    .catch((error: Error) => console.log("Db Connection Error " + error))

//a- Middleware to write request url and method
server.use(morgan(':method :url'));

// b- Middle ware for CORS Package to allow Users reach your site.
server.use(cors());

// routes
server.use(express.json());
server.use(loginRoute);
server.use(patientRoute);
server.use(billsRoute);



// c- General middleware for not Found url pathes with 404 status code.
server.use((request: Request, response: Response) => {
    response.status(404).send("Page Not Found");
});

interface Error {
    status?: number;
}

// d- One Error handling middleware

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {

    let status = error.status || 500;
    response.status(status).json({ message: "Internal Error" + error });
});


