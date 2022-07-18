const { body, param } = require('express-validator');
import express from 'express';
import  {getAllReport,createReport,updateReport,getReportById,deleteReport} from './../controllers/reportController';
import validationMW from './../middlewares/validationMW';
import {validationArry,validationUpdataArry } from './../middlewares/reportExpressvalidation';
const router = express.Router();



router
    .route('/report')
    .get(validationMW,getAllReport)
    .post(validationArry,validationMW,createReport)
    .put(validationUpdataArry,validationMW,updateReport)
router
    .route('/report/:id')
    .get(validationMW,getReportById)
    .delete(deleteReport)
// module.exports = router;
export default router;