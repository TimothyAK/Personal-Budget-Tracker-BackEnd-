const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get("/:expenseID", expenseController.getExpenseById)
router.get("/user/:userID", expenseController.getExpenseByUserId)
router.post("", expenseController.createExpense);
router.post("/sum", expenseController.getSumByMonth)
router.post("/mny", expenseController.getExpensePerMnYByUserId)
router.post("/gbC", expenseController.getExpenseGroupByCategory)
router.put("/:expenseID", expenseController.updateExpense)
router.delete("/:expenseID", expenseController.deleteExpense)

module.exports = router;