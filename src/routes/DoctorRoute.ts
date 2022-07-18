import express from "express";
import { body, param } from "express-validator";
import { check } from "express-validator";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  deleteDoctorAppointmentById,
} from "../controllers/DoctorController";
import validationMW from "../middlewares/validationMW";

// import from "../middlewares/;
console.log("fffffff")
console.log("sss")

const router = express.Router();
router
  .route("/doctor")

  .get(getAllDoctors)

  .post(
     [
      body("fullName")
        .isString()
        .withMessage("Doctor full Name shoud be characters"),
      body("email")
        .isEmail()
        .withMessage("Doctor email shoud be like example@email.com"),
      body("password")
        .isStrongPassword()
        .withMessage(
          "Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
        ),
      body("mobile")
        .isMobilePhone("ar-EG")
        .withMessage("Doctor mobile should be mobile numbers")
        .isLength({ min: 10, max: 14 })
        .withMessage(
          "Doctor mobile length should be between 10 and 14  numbers"
        ),
      body("address")
        .optional()
        .isObject()
        .withMessage("Doctor address should be object"),
      check("address.city")
        .optional()
        .isString()
        .withMessage("Doctor city name should be string"),
      check("address.street")
        .optional()
        .isString()
        .withMessage("Doctor street name should be string"),
      check("address.building")
        .optional()
        .isNumeric()
        .withMessage("Doctor building number should be number"),
      body("role").isString().withMessage("Doctor role should be characters"),
      body("Appointment")
        .optional()
        .isArray()
        .withMessage("Appointment should be number"),
      body("salary")
        .isNumeric()
        .withMessage("Doctor salary stock should be number"),
    ],
    validationMW,
    createDoctor
  )

  .put(
    [
      body("fullName")
        .isString()
        .withMessage("Doctor full Name shoud be characters"),
      body("email")
        .isEmail()
        .withMessage("Doctor email shoud be like example@email.com"),
      body("password")
        .isStrongPassword()
        .withMessage(
          "Doctor Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
        ),
      body("mobile")
        .isMobilePhone("ar-EG")
        .withMessage("Doctor mobile should be mobile numbers")
        .isLength({ min: 10, max: 14 })
        .withMessage(
          "Doctor mobile length should be between 10 and 14  numbers"
        ),
      body("address")
        .optional()
        .isObject()
        .withMessage("Doctor address should be object"),
      check("address.city")
        .optional()
        .isString()
        .withMessage("Doctor city name should be string"),
      check("address.street")
        .optional()
        .isString()
        .withMessage("Doctor street name should be string"),
      check("address.building")
        .optional()
        .isNumeric()
        .withMessage("Doctor building number should be number"),
      body("role").isString().withMessage("Doctor role should be characters"),
      body("Appointment")
        .optional()
        .isArray()
        .withMessage("Appointment should be number"),
      body("salary")
        .isNumeric()
        .withMessage("Doctor salary stock should be number"),
    ],
    validationMW,
    updateDoctor
  );

router
  .route("/doctor/:id")
  // get a specific doctor
  .get(
    [param("id").isNumeric().withMessage("doctor id should be number")],
    validationMW,
    getDoctorById
  )
  // delete doctor
  .delete(
    [param("id").isNumeric().withMessage("doctor id isn't valid id")],
    validationMW,
    deleteDoctor
  )
  router
  .route('/deleteDoctorAppointment/:id')
  .delete(
    param('id')
      .isNumeric()
      .withMessage('doctor id is required and should be number'),
    validationMW,
   deleteDoctorAppointmentById
  );
  export default router;
