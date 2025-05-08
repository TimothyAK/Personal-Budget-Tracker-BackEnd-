const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get("/user/:userID", expenseController.getExpenseByUserId)
router.get("/:expenseID", expenseController.getExpenseById)
router.post("", expenseController.createExpense);
router.post("/mny/:page", expenseController.getExpensePerMnYByUserId)
router.post("/mny/sum", expenseController.getSumByMonth)
router.post("/mny/gbC", expenseController.getExpenseGroupByCategory)
router.put("/:expenseID", expenseController.updateExpense)
router.delete("/:expenseID", expenseController.deleteExpense)

module.exports = router;