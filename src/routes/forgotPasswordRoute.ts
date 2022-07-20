import express, { Router } from 'express';
import { body } from "express-validator";
import validationMW from "../middlewares/validationMW";
import * as controller from "../controllers/forgotPasswordController";

const router: Router = express.Router();

router.post("/forgotPatientPassword", [
    body("fullName").isAlpha().withMessage('patient fullName shoud be characters'),
    body("email").isEmail().withMessage("patient email shoud be like example@email.com"),
    body("mobile").isMobilePhone("ar-EG").withMessage("patient mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage('patient new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotPatientPassword);

router.post("/forgotDoctorPassword", [
    body("fullName").isAlpha().withMessage('doctor fullName shoud be characters'),
    body("email").isEmail().withMessage("doctor email shoud be like example@email.com"),
    body("mobile").isMobilePhone("ar-EG").withMessage("doctor mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage('doctor new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotDoctorPassword);

router.post("/forgotEmployeePassword", [
    body("fullName").isAlpha().withMessage('employee fullName shoud be characters'),
    body("email").isEmail().withMessage("employee email shoud be like example@email.com"),
    body("mobile").isMobilePhone("ar-EG").withMessage("employee mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage('employee new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotEmployeePassword);

router.post("/forgotAdminPassword", [
    body("fullName").isAlpha().withMessage('admin fullName shoud be characters'),
    body("email").isEmail().withMessage("admin email shoud be like example@email.com"),
    body("mobile").isMobilePhone("ar-EG").withMessage("admin mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage('admin new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotAdminPassword);

export default router;