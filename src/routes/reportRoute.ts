const { body, param } = require('express-validator');
import express from 'express';
import  {getAllReport,createReport,updateReport,getReportById,deleteReport} from './../controllers/reportController';
import validationMW from './../middlewares/validationMW';
import {validationArry,validationUpdataArry } from './../middlewares/reportExpressvalidation';
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/checkAutherizationMW";
const router = express.Router();



router
    .route('/report')
    .get(authMW, checkAutherizationMW(['admin']),validationMW,getAllReport)
    .post(authMW, checkAutherizationMW(['admin','employee']),validationArry,validationMW,createReport)
    .put(authMW, checkAutherizationMW(['admin','employee']),validationUpdataArry,validationMW,updateReport)
router
    .route('/report/:id')
    .get(authMW, checkAutherizationMW(['admin','employee']),validationMW,getReportById)
    .delete(authMW, checkAutherizationMW(['admin']),deleteReport)
// module.exports = router;
export default router;