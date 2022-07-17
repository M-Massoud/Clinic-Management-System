import express from 'express';
import { body, param } from "express-validator";
import { check } from "express-validator";
import * as controller from "../controllers/patientController";
import validationMW from "../middlewares/validationMW";
import authMW from "../middlewares/authMW";
import autherizationMW from "../middlewares/checkAutherizationMW";

const router = express.Router();

router.route("/patient")
    .get(authMW, autherizationMW(['admin']), controller.getAllPatients)

    .post(authMW, autherizationMW(['admin', 'employee']), [
        body("fullName").isString().withMessage("patient full name should be string"),
        body("email").isEmail().withMessage("patient email should be like example@email.com"),
        body("password").isStrongPassword().withMessage('patient Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
        body("mobile").isMobilePhone("ar-EG").withMessage("patient mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("patient mobile length should be between 10 and 14  numbers"),

        body("address").optional().isObject().withMessage("patient address should be object"),
        check('address.city').optional().isString().withMessage("patient city name should be string"),
        check('address.street').optional().isString().withMessage("patient street name should be string"),
        check('address.building').optional().isNumeric().withMessage("patient building number should be number"),
        //@ts-ignore
        body("appointments").optional().isArray({ type: Number }).withMessage("patient appointments should be array of patient appointments id"),

        body("payment").optional().isObject().withMessage("patient payment should be object"),
        check('payment.cardType').optional().isIn(['visa', 'mastercard', 'meza']).withMessage("patient credit card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').optional().isNumeric().withMessage("patient credit card number should be number").isLength({ min: 16, max: 16 }).withMessage("patient credit card number length should be 16 numbers"),

        //@ts-ignore
        body("potions").optional().isArray({ type: Object }).withMessage("patient potions should be array of objects"),
        check('potions.*.medicineId').optional().isNumeric().withMessage("patient potions medicine Id should be number"),
        check('potions.*.usageDescription').optional().isString().withMessage("patient potions usageDescription should be string"),

        //@ts-ignore
        body("bills").optional().isArray({ type: Number }).withMessage("patient bills should be array of patient bill id"),
        body("role").optional().isString().withMessage("patient role should be characters"),
    ],
        validationMW,
        controller.createPatient)
    .put(authMW, autherizationMW(['admin', 'employee']), [
        body("id").isNumeric().withMessage("patient id should be number"),
        body("fullName").optional().isString().withMessage("patient full name should be string"),
        body("email").optional().isEmail().withMessage("patient email should be like example@email.com"),
        body("password").optional().isStrongPassword().withMessage('patient Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
        body("mobile").optional().isMobilePhone("ar-EG").withMessage("patient mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("patient mobile length should be between 10 and 14  numbers"),

        body("address").optional().isObject().withMessage("patient address should be object"),
        check('address.city').optional().isString().withMessage("patient city name should be string"),
        check('address.street').optional().isString().withMessage("patient street name should be string"),
        check('address.building').optional().isNumeric().withMessage("patient building number should be number"),
        //@ts-ignore
        body("appointments").optional().isArray({ type: Number }).withMessage("patient appointments should be array of patient appointments id"),

        body("payment").optional().isObject().withMessage("patient payment should be object"),
        check('payment.cardType').optional().isIn(['visa', 'mastercard', 'meza']).withMessage("patient credit card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').optional().isNumeric().withMessage("patient credit card number should be number").isLength({ min: 16, max: 16 }).withMessage("patient credit card number length should be 16 numbers"),

        //@ts-ignore
        body("potions").optional().isArray({ type: Object }).withMessage("patient potions should be array of objects"),
        check('potions.*.medicineId').optional().isNumeric().withMessage("patient potions medicine Id should be number"),
        check('potions.*.usageDescription').optional().isString().withMessage("patient potions usageDescription should be string"),

        //@ts-ignore
        body("bills").optional().isArray({ type: Number }).withMessage("patient bills should be array of patient bill id"),
        body("role").optional().isString().withMessage("patient role should be characters"),
    ],
        validationMW,
        controller.updatePatient)
// .delete(adminAuthorizationMW, [
//     body("id").isNumeric().withMessage("patient id should be number"),
// ],
//     validationMW,
//     controller.deletepatient)

router.route("/patient/:id")
    .get(authMW, autherizationMW(['admin', 'employee', 'patient']), [
        param("id").isNumeric().withMessage("patient id should be number"),
    ],
        validationMW,
        controller.getPatientById)
    .put([
        param("id").isNumeric().withMessage("patient id should be number"),
        body("fullName").optional().isString().withMessage("patient full name should be string"),
        body("email").optional().isEmail().withMessage("patient email should be like example@email.com"),
        body("password").optional().isStrongPassword().withMessage('patient Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
        body("mobile").optional().isMobilePhone("ar-EG").withMessage("patient mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("patient mobile length should be between 10 and 14  numbers"),

        body("address").optional().isObject().withMessage("patient address should be object"),
        check('address.city').optional().isString().withMessage("patient city name should be string"),
        check('address.street').optional().isString().withMessage("patient street name should be string"),
        check('address.building').optional().isNumeric().withMessage("patient building number should be number"),
        //@ts-ignore
        body("appointments").optional().isArray({ type: Number }).withMessage("patient appointments should be array of patient appointments id"),

        body("payment").optional().isObject().withMessage("patient payment should be object"),
        check('payment.cardType').optional().isIn(['visa', 'mastercard', 'meza']).withMessage("patient credit card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').optional().isNumeric().withMessage("patient credit card number should be number").isLength({ min: 16, max: 16 }).withMessage("patient credit card number length should be 16 numbers"),

        //@ts-ignore
        body("potions").optional().isArray({ type: Object }).withMessage("patient potions should be array of objects"),
        check('potions.*.medicineId').optional().isNumeric().withMessage("patient potions medicine Id should be number"),
        check('potions.*.usageDescription').optional().isString().withMessage("patient potions usageDescription should be string"),

        //@ts-ignore
        body("bills").optional().isArray({ type: Number }).withMessage("patient bills should be array of patient bill id"),
        body("role").optional().isString().withMessage("patient role should be characters"),
    ],
        validationMW,
        controller.updatePatientProfile)
    .delete([
        param("id").isNumeric().withMessage("patient id should be number"),
    ],
        validationMW,
        controller.deletePatientById)

router.route("/patient/:id/appointments")
    .get([
        param("id").isNumeric().withMessage("patient id should be number"),
    ],
        validationMW,
        controller.getPatientAppointmentsByPatientId)
    .delete([
        param("id").isNumeric().withMessage("patient id should be numbers"),
        //@ts-ignore
        body("appointments").isArray({ type: Number }).withMessage("patient appointments should be array of appointments id"),
    ],
        validationMW,
        controller.deletePatientAppointmentsByPatientId)

router.route("/patient/:id/bills")
    .get([
        param("id").isNumeric().withMessage("patient id should be number"),
    ],
        validationMW,
        controller.getPatientBillsByPatientId)
    .delete([
        param("id").isNumeric().withMessage("patient id should be numbers"),
        //@ts-ignore
        body("bills").isArray({ type: Number }).withMessage("patient bills should be array of patient bill id"),
    ],
        validationMW,
        controller.deletePatientBillsByPatientId)


export default router;
