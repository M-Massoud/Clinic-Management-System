const { body, param } = require('express-validator');
import express from 'express'
const router = express.Router();
import validationMW from './../middlewares/validationMW';
import { getAllEmploye,createEmploye,updateEmploye,getEmployeById,deleteEmploye} from './../controllers/employController';
import { validationArry,validationUpdataArry} from './../middlewares/employExpressvalidation';
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/checkAutherizationMW";

router
    .route('/employe')
    .get(authMW, checkAutherizationMW(['admin']),getAllEmploye)
    .post(authMW, checkAutherizationMW(['admin']),validationArry,validationMW,createEmploye)
    .put(authMW, checkAutherizationMW(['admin']),validationUpdataArry,validationMW,updateEmploye)
router
    .route('/employe/:id')
    .get(authMW, checkAutherizationMW(['admin','employee-byId']),validationMW,getEmployeById)
    .delete(authMW, checkAutherizationMW(['admin','employee-byId']),deleteEmploye)
// module.exports = router;
export default router;