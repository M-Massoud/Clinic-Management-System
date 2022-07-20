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
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
router
    .route('/employe')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), employController_1.getAllEmploye)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), employExpressvalidation_1.validationArry, validationMW_1.default, employController_1.createEmploye)
    .put(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), employExpressvalidation_1.validationUpdataArry, validationMW_1.default, employController_1.updateEmploye);
router
    .route('/employe/:id')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'employee-byId']), validationMW_1.default, employController_1.getEmployeById)
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin', 'employee-byId']), employController_1.deleteEmploye);
// module.exports = router;
exports.default = router;
