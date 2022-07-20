import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import * as clinicController from '../controllers/clinicController';
import validationMW from '../middlewares/validationMW';
import authMW from '../middlewares/authMW';
import checkAutherizationMW from '../middlewares/checkAutherizationMW';

router
  .route('/clinic')
  .get(clinicController.getAllClinics)
  .post(
    authMW,
    checkAutherizationMW(['admin']),
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
      body('medicines')
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
      body('doctors')
        .isArray()
        .withMessage('clinic doctors must be array of ids'),
      body('patients')
        .isArray()
        .withMessage('clinic patients must be array of ids'),
      body('employees')
        .isArray()
        .withMessage('clinic employees must be array of ids'),
      body('reports')
        .isArray()
        .withMessage('clinic reports must be array of ids'),
      body('speciality')
        .optional()
        .isIn(['dentistry', 'general', 'nutrition', 'psychiatry'])
        .withMessage(
          'invalid clinic speciality please choose one from (dentistry,general, nutrition, psychiatry)'
        ),
    ],
    validationMW,
    clinicController.createNewClinic
  )

  .put(
    authMW,
    checkAutherizationMW(['admin']),
    [
      body('name')
        .optional()
        .isString()
        .withMessage('clinic name should be a valid name'),
      body('mobile')
        .optional()
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
      body('email')
        .optional()
        .isEmail()
        .withMessage('clinic email must be a valid email'),
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
      body('medicines')
        .optional()
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
      body('doctors')
        .optional()
        .isArray()
        .withMessage('clinic doctors must be array of ids'),
      body('patients')
        .optional()
        .isArray()
        .withMessage('clinic patients must be array of ids'),
      body('employees')
        .optional()
        .isArray()
        .withMessage('clinic employees must be array of ids'),
      body('reports')
        .optional()
        .isArray()
        .withMessage('clinic reports must be array of ids'),
      body('speciality')
        .optional()
        .isIn(['dentistry', 'general', 'nutrition', 'psychiatry'])
        .withMessage(
          'invalid clinic speciality please choose one from (dentistry,general, nutrition, psychiatry)'
        ),
    ],
    validationMW,
    clinicController.updateClinic
  );

router
  .route('/clinic/:id')
  .get(authMW, checkAutherizationMW(['admin']), clinicController.getClinicById)
  .delete(
    authMW,
    checkAutherizationMW(['admin']),
    clinicController.deleteClinic
  );

export default router;
