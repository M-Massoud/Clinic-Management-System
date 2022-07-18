// import mongoose from "mongoose";
import { RequestHandler } from "express";

import Doctor from "../models/DoctorModel";
// import { Request, Response,NextFunction } from "express";
import bcrypt from "bcrypt";
const salt: string = bcrypt.genSaltSync(8);
// let doctor = mongoose.model("doctor");

export const getAllDoctors: RequestHandler = (request, response, next) => {
  Doctor.find({}).populate('Appointment')
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const getDoctorById: RequestHandler = (request, response, next) => {
  Doctor.findOne({ _id: request.params.id }).populate('Appointment')
    .then((data) => {
      if (data == null) {
        next(new Error("Doctor not found"));
      } else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createDoctor: RequestHandler = (request, response, next) => {
  bcrypt.hash(
    (request.body as { password: string }).password,
    salt,
    function (err, hash) {
      let object = new Doctor({
        fullName: (request.body as { fullName: string }).fullName,
        mobile: (request.body as { mobile: Number }).mobile,
        password: hash,
        email: (request.body as { email: string }).email,
        Appointment: (request.body as { Appointment: Array<Number> })
          .Appointment,
        role: (request.body as { role: string }).role,
        salary: (request.body as { salary: Number }).salary,
        address: (
          request.body as {
            address: { city: String; street: String; building: Number };
          }
        ).address,
      });
      object
        .save()
        .then(() => {
          response.status(201).json({ data: "Doctor Added Successfully" });
        })
        .catch((error) => next(error));
    }
  );
};

export const updateDoctor: RequestHandler = async (request, response, next) => {
  try {
    const data: any = await Doctor.findOne({ _id: request.body._id });

    for (const key in request.body) {
      if (typeof request.body[key] == "object") {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: "Doctor data updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor: RequestHandler = (request, response, next) => {
  Doctor.deleteOne({ _id: request.params.id }, {})
  .then(data => {
    if (data == null) {
      next(new Error('Doctor not found'));
    } else response.status(200).json({ data: 'Doctor deleted successfully' });
  })
  .catch(error => {
    next(error);
  });
};

export const deleteDoctorAppointmentById : RequestHandler =  (request, response, next) => {
  Doctor.updateOne(
    { _id: request.params.id },
    { $pull: { Appointment: { $in: request.body.Appointment } } }
  )
    .then(data => {
      if (data == null) {
        next(new Error('Appointment not found'));
      } else {
        response.status(200).json({ data: 'Appointment removed successfully' })
      }
    })
    .catch(error => {
      next(error);
    })}