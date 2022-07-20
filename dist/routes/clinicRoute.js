"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const clinicController = __importStar(require("../controllers/clinicController"));
const validationMW_1 = __importDefault(require("../middlewares/validationMW"));
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
router
    .route('/clinic')
    .get(clinicController.getAllClinics)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), [
    (0, express_validator_1.body)('name').isString().withMessage('clinic name should be a string'),
    (0, express_validator_1.body)('mobile')
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
    (0, express_validator_1.body)('email').isEmail().withMessage('clinic email must be a valid email'),
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .withMessage('clinic password should be contain upper case-lower case and to be at least 8 characters'),
    (0, express_validator_1.body)('address')
        .isObject()
        .withMessage('clinic address must be an object in this format {city: street: building: } '),
    (0, express_validator_1.body)('address.city')
        .isString()
        .withMessage('address city must be a string'),
    (0, express_validator_1.body)('address.street')
        .isString()
        .withMessage('address street must be a string'),
    (0, express_validator_1.body)('address.building')
        .isNumeric()
        .withMessage('address building must be a number'),
    (0, express_validator_1.body)('medicines')
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
    (0, express_validator_1.body)('doctors')
        .isArray()
        .withMessage('clinic doctors must be array of ids'),
    (0, express_validator_1.body)('patients')
        .isArray()
        .withMessage('clinic patients must be array of ids'),
    (0, express_validator_1.body)('employees')
        .isArray()
        .withMessage('clinic employees must be array of ids'),
    (0, express_validator_1.body)('reports')
        .isArray()
        .withMessage('clinic reports must be array of ids'),
    (0, express_validator_1.body)('speciality')
        .optional()
        .isIn(['dentistry', 'general', 'nutrition', 'psychiatry'])
        .withMessage('invalid clinic speciality please choose one from (dentistry,general, nutrition, psychiatry)'),
], validationMW_1.default, clinicController.createNewClinic)
    .put(authMW_1.default, checkAutherizationMW_1.default, [
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('clinic name should be a valid name'),
    (0, express_validator_1.body)('mobile')
        .optional()
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('clinic email must be a valid email'),
    (0, express_validator_1.body)('password')
        .optional()
        .isStrongPassword()
        .withMessage('clinic password should be contain upper case-lower case and to be at least 8 characters'),
    (0, express_validator_1.body)('address')
        .optional()
        .isObject()
        .withMessage('clinic address must be an object in this format {city: street: building: } '),
    (0, express_validator_1.body)('address.city')
        .optional()
        .isString()
        .withMessage('address city must be a string'),
    (0, express_validator_1.body)('address.street')
        .optional()
        .isString()
        .withMessage('address street must be a string'),
    (0, express_validator_1.body)('address.building')
        .optional()
        .isNumeric()
        .withMessage('address building must be a number'),
    (0, express_validator_1.body)('medicines')
        .optional()
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
    (0, express_validator_1.body)('doctors')
        .optional()
        .isArray()
        .withMessage('clinic doctors must be array of ids'),
    (0, express_validator_1.body)('patients')
        .optional()
        .isArray()
        .withMessage('clinic patients must be array of ids'),
    (0, express_validator_1.body)('employees')
        .optional()
        .isArray()
        .withMessage('clinic employees must be array of ids'),
    (0, express_validator_1.body)('reports')
        .optional()
        .isArray()
        .withMessage('clinic reports must be array of ids'),
    (0, express_validator_1.body)('speciality')
        .optional()
        .isIn(['dentistry', 'general', 'nutrition', 'psychiatry'])
        .withMessage('invalid clinic speciality please choose one from (dentistry,general, nutrition, psychiatry)'),
], validationMW_1.default, clinicController.updateClinic);
router
    .route('/clinic/:id')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), clinicController.getClinicById)
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), clinicController.deleteClinic);
exports.default = router;
