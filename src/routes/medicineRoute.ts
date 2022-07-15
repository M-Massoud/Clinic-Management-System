import express from 'express';
const router = express.Router();
import * as medicineController from '../controllers/medicineController';
import { body } from 'express-validator';
import validationMW from '../middlewares/validationMW';

router
  .route('/medicine')
  .get(medicineController.getAllMedicines)
  .post(
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
  .get(medicineController.getMedicineById)
  .delete(medicineController.deleteMedicine);

export default router;
