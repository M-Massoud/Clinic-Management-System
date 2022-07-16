const { body, param } = require('express-validator');
import express from 'express'
const router = express.Router();
import validationMW from './../middlewares/validationMW';
import {getAllAdmins,createAdmin,updateAdmin,getAdminById,deleteAdmin } from './../controllers/adminContrloller';
import {validationArry,validationUpdataArry } from './../middlewares/adminExpressvalidation';

router
    .route('/admin')
    .get( getAllAdmins)
    .post(validationArry,validationMW, createAdmin)
    .put(validationUpdataArry,validationMW, updateAdmin)
router
    .route('/admin/:id')
    .get(validationMW, getAdminById)
    .delete( deleteAdmin)
// module.exports = router;
export default router;