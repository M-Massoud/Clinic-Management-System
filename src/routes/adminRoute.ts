const { body, param } = require('express-validator');
import express from 'express';
const router = express.Router();
import validationMW from './../middlewares/validationMW';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  getAdminById,
  deleteAdmin,
} from './../controllers/adminContrloller';
import {
  validationArry,
  validationUpdataArry,
} from './../middlewares/adminExpressvalidation';
import authMW from '../middlewares/authMW';
import checkAutherizationMW from '../middlewares/checkAutherizationMW';

router
  .route('/admin')
  .get(authMW, checkAutherizationMW(['admin']), getAllAdmins)
  .post(
    authMW,
    checkAutherizationMW(['admin']),
    validationArry,
    validationMW,
    createAdmin
  )
  .put(
    authMW,
    checkAutherizationMW(['admin']),
    validationUpdataArry,
    validationMW,
    updateAdmin
  );
router
  .route('/admin/:id')
  .get(authMW, checkAutherizationMW(['admin-byId']), validationMW, getAdminById)
  .delete(authMW, checkAutherizationMW(['admin-byId']), deleteAdmin);
// module.exports = router;
export default router;
