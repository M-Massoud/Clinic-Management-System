import express from 'express';
import { body, param } from "express-validator";
import { check } from "express-validator";
import { getAllBills, createBill, updateBill, getBillById, deleteBillById } from "../controllers/billsController";
import validationMW from "../middlewares/validationMW";

const router = express.Router();

router.route("/bills")
    .get(getAllBills)

    .post([
        body("patientId").isNumeric().withMessage("bill patientId should be number"),
        body('paymentMethod').isIn(['cash', 'credit card', 'insurance']).withMessage("bill payment Method should be one of these ['cash','credit card','insurance']"),
        body('data').optional().isDate().withMessage("bill date should be at date format"),
        body("price").isNumeric().withMessage("bill price should be number"),
    ],
        validationMW,
        createBill)
    .put([
        body("id").isNumeric().withMessage("bill id should be number"),
        body("patientId").optional().isNumeric().withMessage("bill patientId should be number"),
        body('paymentMethod').optional().isIn(['cash', 'credit card', 'insurance']).withMessage("bill payment Method should be one of these ['cash','credit card','insurance']"),
        body('data').optional().isDate().withMessage("bill date should be at date format"),
        body("price").optional().isNumeric().withMessage("bill price should be number"),
    ],
        validationMW,
        updateBill)

router.route("/bills/:id")
    .get([
        param("id").isNumeric().withMessage("bill id should be number"),
    ],
        validationMW,
        getBillById)
    .delete([
        param("id").isNumeric().withMessage("bill id should be number"),
    ],
        validationMW,
        deleteBillById)

export default router;
