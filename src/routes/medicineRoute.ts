import express from 'express';
const router = express.Router();
import * as medicineController from '../controllers/medicineController';
import { body } from 'express-validator';
import validationMW from '../middlewares/validationMW';
import authMW from '../middlewares/authMW';
import checkAutherizationMW from '../middlewares/checkAutherizationMW';

router
  .route('/medicine')
  .get(
    authMW,
    checkAutherizationMW(['admin', 'doctor']),
    medicineController.getAllMedicines
  )
  .post(
    authMW,
    checkAutherizationMW(['admin']),
    [
      body('title').isString().withMessage('medicine title should be a string'),
      body('price')
        .isNumeric()
        .withMessage('medicine price should be a number'),
      body('description')
        .isString()
        .withMessage('medicine description must be a string'),
    ],
    validationMW,
    medicineController.addNewMedicine
  )
  .put(
    authMW,
    checkAutherizationMW(['admin', 'doctor']),
    [
      body('title')
        .optional()
        .isString()
        .withMessage('medicine title should be a string'),
      body('price')
        .optional()
        .isNumeric()
        .withMessage('medicine price should be a number'),
      body('description')
        .optional()
        .isString()
        .withMessage('medicine description must be a string'),
    ],
    validationMW,
    medicineController.updateMedicine
  );

router
  .route('/medicine/:id')
  .get(
    authMW,
    checkAutherizationMW(['admin', 'doctor']),
    medicineController.getMedicineById
  )
  .delete(
    authMW,
    checkAutherizationMW(['admin', 'doctor']),
    medicineController.deleteMedicine
  );

export default router;
