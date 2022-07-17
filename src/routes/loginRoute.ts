import express from 'express';
// const controller=require("../controllers/loginUserController");
import * as controller from "../controllers/loginController";
const route: express.Router = express.Router();

route.post("/login-patient", controller.loginPatient);

export default route;