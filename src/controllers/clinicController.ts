import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';
import Clinic from '../models/clinicModel';

export const getAllClinics = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // console.log(request.query);
  // console.log(request.params);
  Clinic.find({})
    .populate({ path: 'medicine', select: 'title description price' })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const createNewClinic = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let clinic = new Clinic({
    name: request.body.name,
    mobile: request.body.mobile,
    email: request.body.email,
    password: request.body.password,
    'address.city': request.body.address.city,
    'address.street': request.body.address.street,
    'address.building': request.body.address.building,
    medicine: request.body.medicine,
  });
  clinic
    .save()
    .then(data => {
      response.status(201).json({ data: 'added' + data });
    })
    .catch(error => next(error));
};

export const updateClinic = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data: any = await Clinic.findOne({ _id: request.body.id });

    for (let key in request.body) {
      // console.log(key);
      if (request.body[key].constructor.name == 'Array') {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'clinic Updated Successfully' + data });
  } catch (error) {
    next(error);
  }
};

export const getClinicById = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Clinic.findOne({ _id: request.params.id })
    .then(data => {
      if (data == null) next(new Error('clinic cannot be found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deleteClinic = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Clinic.findByIdAndDelete({ _id: request.params.id })

    .then(data => {
      if (data == null) next(new Error('needed clinic cannot be deleted'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};
