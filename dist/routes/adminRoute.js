"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { body, param } = require('express-validator');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validationMW_1 = __importDefault(require("./../middlewares/validationMW"));
const adminContrloller_1 = require("./../controllers/adminContrloller");
const adminExpressvalidation_1 = require("./../middlewares/adminExpressvalidation");
const authMW_1 = __importDefault(require("../middlewares/authMW"));
const checkAutherizationMW_1 = __importDefault(require("../middlewares/checkAutherizationMW"));
router
    .route('/admin')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), adminContrloller_1.getAllAdmins)
    .post(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), adminExpressvalidation_1.validationArry, validationMW_1.default, adminContrloller_1.createAdmin)
    .put(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin']), adminExpressvalidation_1.validationUpdataArry, validationMW_1.default, adminContrloller_1.updateAdmin);
router
    .route('/admin/:id')
    .get(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin-byId']), validationMW_1.default, adminContrloller_1.getAdminById)
    .delete(authMW_1.default, (0, checkAutherizationMW_1.default)(['admin-byId']), adminContrloller_1.deleteAdmin);
// module.exports = router;
exports.default = router;
