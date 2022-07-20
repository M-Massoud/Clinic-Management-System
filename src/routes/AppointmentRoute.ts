import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  sortOldDateAppointments,
  sortNewDateAppointments,
  notScanned,
  Scanned,
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
        .optional()
        .withMessage('doctor  Name shoud be characters'),
      body('patientName')
        .isString()
        .optional()
        .withMessage('patient Name shoud be characters'),
      body('data')
        .optional()
        
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
  //sort by createdAt
  router.route("/newdate").get(sortNewDateAppointments);
  router.route("/olddate").get(sortOldDateAppointments);
  //filter with remove createdAt
  router.route("/notscanned").get(notScanned);
  router.route("/scanned").get(Scanned);
export default router;
