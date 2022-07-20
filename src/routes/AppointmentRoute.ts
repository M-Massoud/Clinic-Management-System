import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../controllers/AppointmentController';

import validationMW from '../middlewares/validationMW';
import authMW from '../middlewares/authMW';
import checkAutherizationMW from '../middlewares/checkAutherizationMW';

const router = express.Router();

router
  .route('/appointment')

  .get(authMW, checkAutherizationMW(['admin']), getAllAppointments)

  .post(
    authMW,
    checkAutherizationMW(['admin', 'employee', 'doctor']),
    [
      body('doctorName')
        .isString()
        .withMessage('doctor  Name shoud be characters'),
      body('patientName')
        .isString()
        .withMessage('patient Name shoud be characters'),
      body('date')
        .optional()
        .isDate()
        .withMessage('Appointment date should be at date format'),
    ],
    validationMW,
    createAppointment
  )

  .put(
    authMW,
    checkAutherizationMW(['admin', 'employee']),
    [
      body('doctorName')
        .isString()
        .withMessage('doctor  Name shoud be characters'),
      body('patientName')
        .isString()
        .withMessage('patient Name shoud be characters'),
      body('data')
        .optional()
        .isDate()
        .withMessage('Appointment date should be at date format'),
    ],
    validationMW,
    updateAppointment
  );

router
  .route('/appointment/:id')
  // get a specific doctor
  .get(
    authMW,
    checkAutherizationMW(['admin', 'employee', 'doctor']),
    [param('id').isNumeric().withMessage('Appointment id should be number')],
    validationMW,
    getAppointmentById
  )
  // delete doctor
  .delete(
    authMW,
    checkAutherizationMW(['admin', 'employee']),
    [param('id').isNumeric().withMessage("Appointment id isn't valid id")],
    validationMW,
    deleteAppointment
  );

export default router;
