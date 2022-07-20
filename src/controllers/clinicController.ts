import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';
import bcrypt from 'bcrypt';

import Clinic from '../models/clinicModel';

export const getAllClinics = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // console.log(request.query);
  // console.log(request.params);
  let clinicData: any;
  // filtering clinics by speciality
  // expected url http://localhost:8080/clinic?speciality=dentistry
  if (request.query.speciality) {
    clinicData = Clinic.find({ speciality: request.query.speciality })
      .populate({ path: 'doctors', select: 'fullName' })
      .populate({ path: 'medicines', select: 'title description price' })
      .populate({ path: 'reports', select: 'invoiceReport appointmentReport' })
      .populate({ path: 'patients', select: 'fullName' })
      .populate({ path: 'employees', select: 'fullName' });
  } else {
    clinicData = Clinic.find({})
      .populate({ path: 'doctors', select: 'fullName' })
      .populate({ path: 'medicines', select: 'title description price' })
      .populate({ path: 'reports', select: 'invoiceReport appointmentReport' })
      .populate({ path: 'patients', select: 'fullName' })
      .populate({ path: 'employees', select: 'fullName' });
  }
  // sorting by medicine name
  // expected url http://localhost:8080/clinic?speciality=dentistry&sortByName=asc
  // http://localhost:8080/medicine?filterByPrice=yes&greater=10&lesser=900&sortByPrice=asc

  if (request.query.sortByName) {
    if (request.query.sortByName == 'asc') clinicData.sort({ name: 1 });
    else if (request.query.sortByName == 'des') {
      clinicData.sort({ name: -1 });
    }
  }

  clinicData
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
  bcrypt.hash(request.body.password, 8, function (err, hash) {
    let clinic = new Clinic({
      name: request.body.name,
      mobile: request.body.mobile,
      email: request.body.email,
      password: hash,
      'address.city': request.body.address.city,
      'address.street': request.body.address.street,
      'address.building': request.body.address.building,
      speciality: request.body.speciality,
      doctors: request.body.doctors,
      medicines: request.body.medicines,
      reports: request.body.reports,
      employees: request.body.employees,
      patients: request.body.patients,
    });
    clinic
      .save()
      .then(data => {
        response.status(201).json({ data: 'added' + data });
      })
      .catch(error => next(error));
  });
};

export const updateClinic = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let data: any = await Clinic.findOne({ _id: request.body.id });
    for (let key in request.body) {
      // check if key is object type
      if (request.body[key].constructor.name == 'Object') {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else {
        data[key] = request.body[key];
      }

      await data.save();
      response.status(200).json({ data: 'clinic updated successfully' });
    }
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
