import { RequestHandler } from "express";
import Bill from "../models/billsModel";

export const getAllBills: RequestHandler = (request, response, next) => {

  if (request.query.sort) {
    Bill.find({}).sort((request.query.sort as string)).then(data => {
      response.status(200).json(data);
    })
      .catch(error => {
        next(error);
      });
  }

  else if (request.query.filterByValue) {
    const queryArray = ((request.query.filterByValue) as string).split(':');
    Bill.find({}).where(queryArray[0]).equals(queryArray[1]).then(data => {
      response.status(200).json(data);
    })
      .catch(error => {
        next(error);
      });
  }

  else if (request.query.FilterByRange) {
    let filterQueryString: string = JSON.stringify(request.query.FilterByRange);
    filterQueryString = filterQueryString.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`);
    Bill.find(JSON.parse(filterQueryString)).then(data => {
      response.status(200).json(data);
    })
      .catch(error => {
        next(error);
      });
  }

  else {
    Bill.find({})
      .then(data => {
        response.status(200).json(data);
      })
      .catch(error => {
        next(error);
      });
  }
};

export const createBill: RequestHandler = (request, response, next) => {

  let object = new Bill({
    paymentMethod: (request.body as { paymentMethod: string }).paymentMethod,
    patientId: (request.body as { patientId: number }).patientId,
    date: (request.body as { date: Date }).date,
    price: (request.body as { price: number }).price,
  });
  object
    .save()
    .then(() => {
      response.status(201).json({ data: 'Bill Added Successfully' });
    })
    .catch(error => next(error));

};

export const updateBill: RequestHandler = async (request, response, next) => {
  try {
    let data: any = await Bill.findOne({ _id: (request.body as { id: number }).id });

    for (let key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();
    response.status(200).json({ data: 'Bill data updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getBillById: RequestHandler = (request, response, next) => {
  Bill.find({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('Bill not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deleteBillById: RequestHandler = (request, response, next) => {
  Bill.deleteOne({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('Bill not found'));
      } else response.status(200).json({ data: 'Bill deleted successfully' });
    })
    .catch(error => {
      next(error);
    });
};