const express = require('express');
const router = express.Router();

const Income = require("../Controllers/Income")

router.route("/addincomecategory").post(Income.addIncomeCategory);
router.route("/getincomecategory").get(Income.getIncomeCategory);
router.route("/deleteincomecategory/:id").delete(Income.deleteIncomeCategory);
router.route("/addincome").post(Income.addIncome);
router.route("/getincome").get(Income.getIncome);
router.route("/deleteincome/:id").delete(Income.deleteIncome);
router.route("/getperincome/:id").get(Income.getPerIncome);
router.route("/editincome").put(Income.editIncome);
module.exports = router;