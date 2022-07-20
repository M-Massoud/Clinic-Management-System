import { RequestHandler } from 'express';
import Patient from '../models/patientModel';
import bcrypt from 'bcrypt';

const salt: string = bcrypt.genSaltSync(
  Number(process.env.saltRounds as string)
);

export const getAllPatients: RequestHandler = (request, response, next) => {
  Patient.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const createPatient: RequestHandler = (request, response, next) => {
  bcrypt.hash(
    (request.body as { password: string }).password,
    Number(salt),
    function (err, hash) {
      let object = new Patient({
        fullName: (request.body as { fullName: string }).fullName,
        email: (request.body as { email: string }).email,
        password: hash,
        mobile: (request.body as { mobile: Number }).mobile,
        address: (
          request.body as {
            address: { city: String; street: String; building: Number };
          }
        ).address,
        appointments: (request.body as { appointments: Array<Number> })
          .appointments,
        potions: (
          request.body as {
            potions: Array<{ medicineId: Number; usageDescription: String }>;
          }
        ).potions,
        payment: (
          request.body as { payment: { cardType: String; cardNumber: Number } }
        ).payment,
        bills: (request.body as { bills: Array<Number> }).bills,
        role: (request.body as { role: string }).role,
      });
      object
        .save()
        .then(() => {
          response.status(201).json({ data: 'Patient Added Successfully' });
        })
        .catch(error => next(error));
    }
  );
};

export const updatePatient: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    let data: any = await Patient.findOne({
      _id: (request.body as { id: number }).id,
    });

    for (let key in request.body) {
      if (key === 'password') {
        next(new Error("cann't change password"));
      } else {
        // check if key is object type
        if (request.body[key].constructor.name == 'Object') {
          for (let item in request.body[key]) {
            data[key][item] = request.body[key][item];
          }
        }

        // check if key is array type
        else if (request.body[key].constructor.name == 'Array') {
          for (let item in request.body[key]) {
            data[key].push(request.body[key][item]);
          }
        } else {
          data[key] = request.body[key];
        }
      }
    }

    await data.save();
    response.status(200).json({ data: 'Patient data updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const updatePatientProfile: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    let data: any = await Patient.findOne({ _id: request.params.id });

    for (let key in request.body) {
      if (key === 'password') {
        next(new Error("cann't change password"));
      } else {
        // check if key is object type
        if (request.body[key].constructor.name == 'Object') {
          for (let item in request.body[key]) {
            data[key][item] = request.body[key][item];
          }
        }

        // check if key is array type
        else if (request.body[key].constructor.name == 'Array') {
          for (let item in request.body[key]) {
            data[key].push(request.body[key][item]);
          }
        } else {
          data[key] = request.body[key];
        }
      }
    }

    await data.save();
    response.status(200).json({ data: 'Patient data updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getPatientById: RequestHandler = (request, response, next) => {
  Patient.find({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('Patient not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deletePatientById: RequestHandler = (request, response, next) => {
  Patient.deleteOne({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('Patient not found'));
      } else
        response.status(200).json({ data: 'Patient deleted successfully' });
    })
    .catch(error => {
      next(error);
    });
};

export const getPatientBillsByPatientId: RequestHandler = (
  request,
  response,
  next
) => {
  Patient.find({ _id: request.params.id }, { _id: 0, bills: 1 })
    .populate('bills')
    .then(data => {
      if (data == null) {
        next(new Error('Patient bill not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deletePatientBillsByPatientId: RequestHandler = (
  request,
  response,
  next
) => {
  Patient.updateOne(
    { _id: request.params.id },
    { $pull: { bills: { $in: (request.body as { bills: [] }).bills } } }
  )
    .then(data => {
      if (data == null) {
        next(new Error('Patient bill not found'));
      } else {
        response
          .status(200)
          .json({ data: 'Patient bill removed successfully' });
      }
    })
    .catch(error => {
      next(error);
    });
};

export const getPatientAppointmentsByPatientId: RequestHandler = (
  request,
  response,
  next
) => {
  Patient.find({ _id: request.params.id }, { _id: 0, appointments: 1 })
    .populate({ path: 'appointments', select: '-_id' })
    .then(data => {
      if (data == null) {
        next(new Error('Patient appointments not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

export const deletePatientAppointmentsByPatientId: RequestHandler = (
  request,
  response,
  next
) => {
  Patient.updateOne(
    { _id: request.params.id },
    {
      $pull: {
        appointments: {
          $in: (request.body as { appointments: [] }).appointments,
        },
      },
    }
  )
    .then(data => {
      if (data == null) {
        next(new Error('Patient Appointment not found'));
      } else {
        response
          .status(200)
          .json({ data: 'Patient Appointment removed successfully' });
      }
    })
    .catch(error => {
      next(error);
    });
};
