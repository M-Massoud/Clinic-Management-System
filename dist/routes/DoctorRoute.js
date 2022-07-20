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
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
// import from "../middlewares/;
const router = express_1.default.Router();
router
    .route('/doctor')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), DoctorController_1.getAllDoctors)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), [
    (0, express_validator_1.body)('fullName')
        .isString()
        .withMessage('Doctor full Name shoud be characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Doctor email shoud be like example@email.com'),
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .withMessage('Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    (0, express_validator_1.body)('mobile')
        .isMobilePhone('ar-EG')
        .withMessage('Doctor mobile should be valid mobile number')
        .isLength({ min: 10, max: 14 })
        .withMessage('Doctor mobile length should be between 10 and 14  numbers'),
    (0, express_validator_1.body)('address')
        .optional()
        .isObject()
        .withMessage('Doctor address should be object'),
    (0, express_validator_2.check)('address.city')
        .optional()
        .isString()
        .withMessage('Doctor city name should be string'),
    (0, express_validator_2.check)('address.street')
        .optional()
        .isString()
        .withMessage('Doctor street name should be string'),
    (0, express_validator_2.check)('address.building')
        .optional()
        .isNumeric()
        .withMessage('Doctor building number should be number'),
    (0, express_validator_1.body)('role')
        .optional()
        .isString()
        .withMessage('Doctor role should be characters'),
    (0, express_validator_1.body)('Appointment')
        .optional()
        .isArray()
        .withMessage('Appointment should be number'),
    (0, express_validator_1.body)('salary')
        .isNumeric()
        .withMessage('Doctor salary stock should be number'),
], validationMW_1.default, DoctorController_1.createDoctor)
    .put(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), [
    (0, express_validator_1.body)('fullName')
        .isString()
        .optional()
        .withMessage('Doctor full Name shoud be characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .optional()
        .withMessage('Doctor email shoud be like example@email.com'),
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .optional()
        .withMessage('Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    (0, express_validator_1.body)('mobile')
        .isMobilePhone('ar-EG')
        .withMessage('Doctor mobile should be mobile numbers')
        .isLength({ min: 10, max: 14 })
        .optional()
        .withMessage('Doctor mobile length should be between 10 and 14  numbers'),
    (0, express_validator_1.body)('address')
        .optional()
        .isObject()
        .withMessage('Doctor address should be object'),
    (0, express_validator_2.check)('address.city')
        .optional()
        .isString()
        .withMessage('Doctor city name should be string'),
    (0, express_validator_2.check)('address.street')
        .optional()
        .isString()
        .withMessage('Doctor street name should be string'),
    (0, express_validator_2.check)('address.building')
        .optional()
        .isNumeric()
        .withMessage('Doctor building number should be number'),
    (0, express_validator_1.body)('role').isString().withMessage('Doctor role should be characters'),
    (0, express_validator_1.body)('Appointment')
        .optional()
        .isArray()
        .withMessage('Appointment should be number'),
    (0, express_validator_1.body)('salary')
        .isNumeric()
        .optional()
        .withMessage('Doctor salary stock should be number'),
], validationMW_1.default, DoctorController_1.updateDoctor);
router
    .route('/doctor/:id')
    // get a specific doctor
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'doctor-byId']), [(0, express_validator_1.param)('id').isNumeric().withMessage('doctor id should be number')], validationMW_1.default, DoctorController_1.getDoctorById)
    // delete doctor
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'doctor-byId']), [(0, express_validator_1.param)('id').isNumeric().withMessage("doctor id isn't valid id")], validationMW_1.default, DoctorController_1.deleteDoctor);
router
    .route('/deleteDoctorAppointment/:id')
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'doctor-byId']), (0, express_validator_1.param)('id')
    .isNumeric()
    .withMessage('doctor id is required and should be number'), validationMW_1.default, DoctorController_1.deleteDoctorAppointmentById);
//sort salary
router.route("/lowsalary").get(DoctorController_1.sortLowSalaryDoctors);
router.route("/highsalary").get(DoctorController_1.sortHighSalaryDoctors);
//filter salary
router.route("/highSalary/:key").get(DoctorController_1.highSalaryDoctors);
router.route("/lessSalary/:key").get(DoctorController_1.lessSalaryDoctors);
exports.default = router;
