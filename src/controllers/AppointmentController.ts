import { RequestHandler } from "express";
import appointment from "../models/AppointmentModel";

export const getAllAppointments: RequestHandler = (request, response, next) => {
  appointment
    .find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const getAppointmentById: RequestHandler = (request, response, next) => {
  appointment
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Appointment not found"));
      } else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createAppointment: RequestHandler = (request, response, next) => {
        let object = new appointment({
            doctorName: (request.body as { doctorName: String }).doctorName,
            patientName: (request.body as { patientName: string }).patientName,
            date:(request.body as { date: Date }).date

        });
        object
          .save()
          .then(() => {
            response.status(201).json({ data: "Appointment Added Successfully" });
          })
          .catch((error) => next(error));
  };

export const updateAppointment: RequestHandler = async (request, response, next) => {
    try {
      const data: any = await appointment.findOne({ _id: request.body._id });
  
      for (const key in request.body) {
        if (typeof request.body[key] == "object") {
          for (let item in request.body[key]) {
            data[key][item] = request.body[key][item];
          }
        } else data[key] = request.body[key];
      }
  
      await data.save();
  
      response.status(200).json({ data: "Appointment data updated successfully" });
    } catch (error) {
      next(error);
    }
  };


export const deleteAppointment: RequestHandler = (request, response, next) => {
    appointment.deleteOne({ _id: request.params.id }, {})
    .then(data => {
      if (data == null) {
        next(new Error('Appointment not found'));
      } else response.status(200).json({ data: 'Appointment deleted successfully' });
    })
    .catch(error => {
      next(error);
    });
  };