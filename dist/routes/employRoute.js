"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { body, param } = require('express-validator');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validationMW_1 = __importDefault(require("./../middlewares/validationMW"));
const employController_1 = require("./../controllers/employController");
const employExpressvalidation_1 = require("./../middlewares/employExpressvalidation");
router
    .route('/employe')
    .get(employController_1.getAllEmploye)
    .post(employExpressvalidation_1.validationArry, validationMW_1.default, employController_1.createEmploye)
    .put(employExpressvalidation_1.validationUpdataArry, validationMW_1.default, employController_1.updateEmploye);
router
    .route('/employe/:id')
    .get(validationMW_1.default, employController_1.getEmployeById)
    .delete(employController_1.deleteEmploye);
// module.exports = router;
exports.default = router;
