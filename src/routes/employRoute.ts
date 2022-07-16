const { body, param } = require('express-validator');
import express from 'express'
const router = express.Router();
import validationMW from './../middlewares/validationMW';
import { getAllEmploye,createEmploye,updateEmploye,getEmployeById,deleteEmploye} from './../controllers/employController';
import { validationArry,validationUpdataArry} from './../middlewares/employExpressvalidation';

router
    .route('/employe')
    .get(getAllEmploye)
    .post(validationArry,validationMW,createEmploye)
    .put(validationUpdataArry,validationMW,updateEmploye)
router
    .route('/employe/:id')
    .get(validationMW,getEmployeById)
    .delete(deleteEmploye)
// module.exports = router;
export default router;