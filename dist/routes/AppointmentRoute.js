"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AppointmentController_1 = require("../controllers/AppointmentController");
const validationMW_1 = __importDefault(require("../middlewares/validationMW"));
console.log("hhhhh");
const router = express_1.default.Router();
router
    .route("/appointment")
    .get(AppointmentController_1.getAllAppointments)
    .post([
    (0, express_validator_1.body)("doctorName")
        .isString()
        .withMessage("doctor  Name shoud be characters"),
    (0, express_validator_1.body)("patientName")
        .isString()
        .withMessage("patient Name shoud be characters"),
    (0, express_validator_1.body)("date")
        .optional()
        .isDate()
        .withMessage("Appointment date should be at date format"),
], validationMW_1.default, AppointmentController_1.createAppointment)
    .put([
    (0, express_validator_1.body)("doctorName")
        .isString()
        .withMessage("doctor  Name shoud be characters"),
    (0, express_validator_1.body)("patientName")
        .isString()
        .withMessage("patient Name shoud be characters"),
    (0, express_validator_1.body)("data")
        .optional()
        .isDate()
        .withMessage("Appointment date should be at date format"),
], validationMW_1.default, AppointmentController_1.updateAppointment);
router
    .route("/appointment/:id")
    // get a specific doctor
    .get([(0, express_validator_1.param)("id").isNumeric().withMessage("Appointment id should be number")], validationMW_1.default, AppointmentController_1.getAppointmentById)
    // delete doctor
    .delete([(0, express_validator_1.param)("id").isNumeric().withMessage("Appointment id isn't valid id")], validationMW_1.default, AppointmentController_1.deleteAppointment);
exports.default = router;
