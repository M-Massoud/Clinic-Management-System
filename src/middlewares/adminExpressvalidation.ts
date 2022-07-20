const { body, param, query } = require("express-validator");
const check = require('express-validator').check;

export const validationArry =[
    body('fullName')
      .isAlpha()
      .withMessage('admin fullName shoud be characters'),
    body('password')
      .isStrongPassword()
      .withMessage(
        'admin Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
      ),
    body('email')
      .isEmail()
        .withMessage('admin email shoud be like example@email.com'),
    body("mobile").isMobilePhone('ar-EG').withMessage("Employe mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body('role').optional()
    .isAlpha()
    .withMessage('admin role shoud be characters'),  
]
  
export const validationUpdataArry =[
    body('fullName').optional()
      .isAlpha()
      .withMessage('admin fullName shoud be characters'),
    body('password').optional()
      .isStrongPassword()
      .withMessage(
        'admin Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
      ),
    body('email').optional()
      .isEmail()
        .withMessage('admin email shoud be like example@email.com'),
    body("mobile").optional().isMobilePhone('ar-EG').withMessage("Employe mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body('role').optional()
    .isAlpha()
    .withMessage('admin role shoud be characters'),  
  ]