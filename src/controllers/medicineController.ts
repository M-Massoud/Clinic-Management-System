import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';
import Medicine from '../models/medicineModel';

export const getAllMedicines = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const addNewMedicine = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let medicine = new Medicine({
    title: request.body.title,
    price: request.body.price,
    description: request.body.description,
  });
  medicine
    .save()
    .then(data => {
      response.status(201).json({ data: 'added' + data });
    })
    .catch(error => next(error));
};

export const updateMedicine = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data: any = await Medicine.findOne({ _id: request.body.id });

    for (let key in request.body) {
      // console.log(key);
      if (request.body[key].constructor.name == 'Array') {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'medicine Updated Successfully' + data });
  } catch (error) {
    next(error);
  }
};

export const getMedicineById = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.findOne({ _id: request.params.id })
    .then(data => {
      if (data == null) next(new Error('medicine cannot be found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deleteMedicine = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.findByIdAndDelete({ _id: request.params.id })

    .then(data => {
      if (data == null) next(new Error('needed medicine cannot be deleted'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};
