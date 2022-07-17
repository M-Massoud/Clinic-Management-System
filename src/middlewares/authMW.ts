import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
// const jwt = require('jsonwebtoken');
export interface IMyRequest extends Request {
  id?: number,
  role?: string,
}
// export interface CustomRequest extends Request {
//   decodedToekn: string | JwtPayload;
//  }
export default (request: Request, response: Response, next: NextFunction) => {
  // let decodedToekn = null;
  try {
    //@ts-ignore
    let token = request.get('Authorization').split(' ')[1];
    let decodedToekn = jwt.verify(token, process.env.secret_Key as string);
    (request as IMyRequest).role = (decodedToekn as IMyRequest).role;
    (request as IMyRequest).id = (decodedToekn as IMyRequest).id;
    next();
  } catch (error: any) {
    error.message = 'Not Authorized';
    error.status = 403;
    next(error);
  }
};

// import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// export const SECRET_KEY: Secret = 'your-secret-key-here';

// export interface CustomRequest extends Request {
//   token: string | JwtPayload;
// }

// export const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       throw new Error();
//     }

//     const decoded = jwt.verify(token, SECRET_KEY);
//     (req as CustomRequest).token = decoded;

//     next();
//   } catch (err) {
//     res.status(401).send('Please authenticate');
//   }
// };