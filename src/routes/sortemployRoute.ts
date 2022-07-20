const { body, param } = require('express-validator');
import express from 'express';
import { getSortedEmployeName,getSortedEmployeSalary,getSortedEmployeDesSalary,filterEmploysalary } from './../controllers/employsortController';
const router = express.Router();

router
    .route('/sort-employe/fullName')
    .get(getSortedEmployeName)
router
    .route('/sort-employe/salary')
    .get(getSortedEmployeSalary)
router
    .route('/sort-employe/des-salary')
    .get(getSortedEmployeDesSalary)
router
    .route('/filter-salary')
    .get(filterEmploysalary)
   
    
export default router;