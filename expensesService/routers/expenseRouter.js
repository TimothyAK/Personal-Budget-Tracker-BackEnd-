const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get("/expense/:expenseID", expenseController.getExpenseById)
router.get("/user/:userID", expenseController.getExpenseByUserId)
router.post("", expenseController.createExpense);

module.exports = router;