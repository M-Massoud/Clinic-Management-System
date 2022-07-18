"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const DoctorController_1 = require("../controllers/DoctorController");
const validationMW_1 = __importDefault(require("../middlewares/validationMW"));
// import from "../middlewares/;
console.log("fffffff");
console.log("sss");
const router = express_1.default.Router();
router
    .route("/doctor")
    .get(DoctorController_1.getAllDoctors)
    .post([
    (0, express_validator_1.body)("fullName")
        .isString()
        .withMessage("Doctor full Name shoud be characters"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Doctor email shoud be like example@email.com"),
    (0, express_validator_1.body)("password")
        .isStrongPassword()
        .withMessage("Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"),
    (0, express_validator_1.body)("mobile")
        .isMobilePhone("ar-EG")
        .withMessage("Doctor mobile should be mobile numbers")
        .isLength({ min: 10, max: 14 })
        .withMessage("Doctor mobile length should be between 10 and 14  numbers"),
    (0, express_validator_1.body)("address")
        .optional()
        .isObject()
        .withMessage("Doctor address should be object"),
    (0, express_validator_2.check)("address.city")
        .optional()
        .isString()
        .withMessage("Doctor city name should be string"),
    (0, express_validator_2.check)("address.street")
        .optional()
        .isString()
        .withMessage("Doctor street name should be string"),
    (0, express_validator_2.check)("address.building")
        .optional()
        .isNumeric()
        .withMessage("Doctor building number should be number"),
    (0, express_validator_1.body)("role").isString().withMessage("Doctor role should be characters"),
    (0, express_validator_1.body)("Appointment")
        .optional()
        .isArray()
        .withMessage("Appointment should be number"),
    (0, express_validator_1.body)("salary")
        .isNumeric()
        .withMessage("Doctor salary stock should be number"),
], validationMW_1.default, DoctorController_1.createDoctor)
    .put([
    (0, express_validator_1.body)("fullName")
        .isString()
        .withMessage("Doctor full Name shoud be characters"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Doctor email shoud be like example@email.com"),
    (0, express_validator_1.body)("password")
        .isStrongPassword()
        .withMessage("Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"),
    (0, express_validator_1.body)("mobile")
        .isMobilePhone("ar-EG")
        .withMessage("Doctor mobile should be mobile numbers")
        .isLength({ min: 10, max: 14 })
        .withMessage("Doctor mobile length should be between 10 and 14  numbers"),
    (0, express_validator_1.body)("address")
        .optional()
        .isObject()
        .withMessage("Doctor address should be object"),
    (0, express_validator_2.check)("address.city")
        .optional()
        .isString()
        .withMessage("Doctor city name should be string"),
    (0, express_validator_2.check)("address.street")
        .optional()
        .isString()
        .withMessage("Doctor street name should be string"),
    (0, express_validator_2.check)("address.building")
        .optional()
        .isNumeric()
        .withMessage("Doctor building number should be number"),
    (0, express_validator_1.body)("role").isString().withMessage("Doctor role should be characters"),
    (0, express_validator_1.body)("Appointment")
        .optional()
        .isArray()
        .withMessage("Appointment should be number"),
    (0, express_validator_1.body)("salary")
        .isNumeric()
        .withMessage("Doctor salary stock should be number"),
], validationMW_1.default, DoctorController_1.updateDoctor);
router
    .route("/doctor/:id")
    // get a specific doctor
    .get([(0, express_validator_1.param)("id").isNumeric().withMessage("doctor id should be number")], validationMW_1.default, DoctorController_1.getDoctorById)
    // delete doctor
    .delete([(0, express_validator_1.param)("id").isNumeric().withMessage("doctor id isn't valid id")], validationMW_1.default, DoctorController_1.deleteDoctor);
router
    .route('/deleteDoctorAppointment/:id')
    .delete((0, express_validator_1.param)('id')
    .isNumeric()
    .withMessage('doctor id is required and should be number'), validationMW_1.default, DoctorController_1.deleteDoctorAppointmentById);
exports.default = router;
