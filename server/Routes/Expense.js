const express = require('express');
const router = express.Router();

const Expense = require("../Controllers/Expense")

router.route("/addexpcategory").post(Expense.addExpCategory);
router.route("/getexpcategory").get(Expense.getExpCategory);
router.route("/getgenerateexpenses").get(Expense.getGenerateExpenses);
router.route("/deleteexpcategory/:id").delete(Expense.deleteExpCategory);
router.route("/addexpenses").post(Expense.addExpenses);
router.route("/getexpenses").get(Expense.getExpenses);
router.route("/deleteexpenses/:id").delete(Expense.deleteExpenses);
router.route("/getperexpenses/:id").get(Expense.getPerExpenses);
router.route("/editexpenses").put(Expense.editExpenses);
module.exports = router;