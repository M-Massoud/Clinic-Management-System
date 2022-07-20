"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { body, param } = require('express-validator');
const express_1 = __importDefault(require("express"));
const reportController_1 = require("./../controllers/reportController");
const validationMW_1 = __importDefault(require("./../middlewares/validationMW"));
const reportExpressvalidation_1 = require("./../middlewares/reportExpressvalidation");
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
const router = express_1.default.Router();
router
    .route('/report')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), validationMW_1.default, reportController_1.getAllReport)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'employee']), reportExpressvalidation_1.validationArry, validationMW_1.default, reportController_1.createReport)
    .put(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'employee']), reportExpressvalidation_1.validationUpdataArry, validationMW_1.default, reportController_1.updateReport);
router
    .route('/report/:id')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'employee']), validationMW_1.default, reportController_1.getReportById)
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), reportController_1.deleteReport);
// module.exports = router;
exports.default = router;
