import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import * as clinicController from '../controllers/clinicController';
import validationMW from '../middlewares/validationMW';

router
  .route('/clinic')
  .get(clinicController.getAllClinics)
  .post(
    [
      body('name').isString().withMessage('clinic name should be a string'),
      body('mobile')
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
      body('email').isEmail().withMessage('clinic email must be a valid email'),
      body('password')
        .isStrongPassword()
        .withMessage(
          'clinic password should be contain upper case-lower case and to be at least 8 characters'
        ),
      body('address')
        .isObject()
        .withMessage(
          'clinic address must be an object in this format {city: street: building: } '
        ),
      body('address.city')
        .isString()
        .withMessage('address city must be a string'),
      body('address.street')
        .isString()
        .withMessage('address street must be a string'),
      body('address.building')
        .isNumeric()
        .withMessage('address building must be a number'),
      body('medicine')
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
    ],
    validationMW,
    clinicController.createNewClinic
  )
  .put(
    [
      body('name')
        .optional()
        .isString()
        .withMessage('clinic name should be a string'),
      body('mobile')
        .optional()
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
      body('email').isEmail().withMessage('clinic email must be a valid email'),
      body('password')
        .optional()
        .isStrongPassword()
        .withMessage(
          'clinic password should be contain upper case-lower case and to be at least 8 characters'
        ),
      body('address')
        .optional()
        .isObject()
        .withMessage(
          'clinic address must be an object in this format {city: street: building: } '
        ),
      body('address.city')
        .optional()
        .isString()
        .withMessage('address city must be a string'),
      body('address.street')
        .optional()
        .isString()
        .withMessage('address street must be a string'),
      body('address.building')
        .optional()
        .isNumeric()
        .withMessage('address building must be a number'),
    ],
    validationMW,
    clinicController.updateClinic
  );

router
  .route('/clinic/:id')
  .get(clinicController.getClinicById)
  .delete(clinicController.deleteClinic);

export default router;
