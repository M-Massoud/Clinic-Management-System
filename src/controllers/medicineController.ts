import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';
import Medicine from '../models/medicineModel';

export const getAllMedicines = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // filtering data by price in range
  // expected url
  // http://localhost:8080/medicine?filterByPrice=yes&greater=100&lesser=1200
  let medicineData = request.query.filterByPrice
    ? Medicine.find({
        price: { $gte: request.query.greater, $lte: request.query.lesser },
      })
    : Medicine.find();

  // sorting by price
  // expected url http://localhost:8080/medicine?sortByPrice=des
  if (request.query.sortByPrice) {
    if (request.query.sortByPrice == 'asc') medicineData.sort({ price: 1 });
    else if (request.query.sortByPrice == 'des') {
      medicineData.sort({ price: -1 });
    }
  }
  // sorting by medicine name
  if (request.query.sortByName) {
    if (request.query.sortByName == 'asc') medicineData.sort({ title: 1 });
    else if (request.query.sortByName == 'des') {
      medicineData.sort({ title: -1 });
    }
  }

  medicineData
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
