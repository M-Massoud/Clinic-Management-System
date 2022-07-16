// const { body, param, query } = require("express-validator");
import { body} from 'express-validator';
// const check = require('express-validator').check;

export const validationArry =[
    body('invoiceReport')
      .isString()
      .withMessage('invoiceReport shoud be characters'),
    body('appointmentReport')
    .isString()
      .withMessage(
        'appointmentReport shoud be characters'
      )  
]
  
export const validationUpdataArry =[
    body('invoiceReport').optional()
      .isString()
      .withMessage('invoiceReport shoud be characters'),
      body('appointmentReport').optional()
      .isString()
      .withMessage(
        'appointmentReport shoud be characters'
      )  
  ]