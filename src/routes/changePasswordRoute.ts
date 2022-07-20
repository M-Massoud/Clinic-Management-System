import express, { Router } from 'express';
import { body } from "express-validator";
import * as controller from "../controllers/changePasswordController";
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/checkAutherizationMW";

const router: Router = express.Router();

router.post("/changePatientPassword", authMW, checkAutherizationMW(['patient']), [
    body("oldPassword").isStrongPassword().withMessage('patient old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('patient new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changePatientPassword);

router.post("/changeDoctorPassword", authMW, checkAutherizationMW(['doctor']), [
    body("oldPassword").isStrongPassword().withMessage('doctor old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('doctor new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changeDoctorPassword);

router.post("/changeEmployeePassword", authMW, checkAutherizationMW(['employee']), [
    body("oldPassword").isStrongPassword().withMessage('employee old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('employee new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changeEmployeePassword);

router.post("/changeAdminPassword", authMW, checkAutherizationMW(['admin']), [
    body("oldPassword").isStrongPassword().withMessage('admin old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('admin new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changeAdminPassword);

export default router;