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
const medicineController = __importStar(require("../controllers/medicineController"));
const express_validator_1 = require("express-validator");
const validationMW_1 = __importDefault(require("../middlewares/validationMW"));
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
router
    .route('/medicine')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), medicineController.getAllMedicines)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), [
    (0, express_validator_1.body)('title').isString().withMessage('medicine title should be a string'),
    (0, express_validator_1.body)('price')
        .isNumeric()
        .withMessage('medicine price should be a number'),
    (0, express_validator_1.body)('description')
        .isString()
        .withMessage('medicine description must be a string'),
], validationMW_1.default, medicineController.addNewMedicine)
    .put(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), [
    (0, express_validator_1.body)('title')
        .optional()
        .isString()
        .withMessage('medicine title should be a string'),
    (0, express_validator_1.body)('price')
        .optional()
        .isNumeric()
        .withMessage('medicine price should be a number'),
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('medicine description must be a string'),
], validationMW_1.default, medicineController.updateMedicine);
router
    .route('/medicine/:id')
    .get(medicineController.getMedicineById)
    .delete(authMW_1.default, checkAutherizationMW_1.default, medicineController.deleteMedicine);
exports.default = router;
