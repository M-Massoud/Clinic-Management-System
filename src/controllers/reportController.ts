import Report from './../models/reportModel';
import {RequestHandler } from 'express';


export const getAllReport:RequestHandler = (request, response, next) => {
    Report.find({})
        .then((data: any) => {
            response.status(200).json(data);
        }).catch((error: any) => {
            next(error);
        })  
};

export const getReportById:RequestHandler = (request, response, next) => {
    Report.findOne({ _id: request.params.id })
        .then((data: any) => {
            if (data == null) { next(new Error('Report not found')); }
            else { response.status(200).json(data); }
        })
        .catch((error: any) => {
            next(error);
        })
};

export const createReport:RequestHandler = (request, response, next) => {
   // bcrypt.hash(request.body.password, function (error: any, hash: any) {
        let object = new Report({
            _id: (request.body as {id:Number}).id,
            invoiceReport: (request.body as {invoiceReport:String}). invoiceReport,
            appointmentReport: (request.body as {appointmentReport:String}).appointmentReport,
        });
        object.save()
            .then((data:any) => {
                response.status(201).json({data:"Report data added successfully"})
        }).catch((error:any)=>next(error))
    //});
};

export const updateReport:RequestHandler = async (request, response, next) => {
    try {
        const data:any = await Report.findOne({ _id: request.body.id });
        for (const key in request.body) {
            if (typeof request.body[key] == 'object') {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            } else data[key] = request.body[key];
        }
      
        await data.save();
      
        response.status(200).json({ data: 'Report data updated' });
    } catch (error) {
        next(error)
    }
};

export const deleteReport:RequestHandler = (request, response, next) => {
    Report.deleteOne({ _id: request.params.id }, {})
        .then((data:any) => {
            response.status(200).json(data);
    }).catch((error:any)=>next(error))
};

