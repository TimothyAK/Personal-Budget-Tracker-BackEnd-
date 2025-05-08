const express = require('express');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

router.get("/user/:userID/:page", budgetController.getBudgetByUserId);
router.get("/:budgetID", budgetController.getBudgetById);
router.post("", budgetController.createBudget);
router.post("/check", budgetController.checkBudgetExpense);
router.put("/:budgetID", budgetController.updateBudget);
router.delete("/:budgetID", budgetController.deleteBudget);

module.exports = router;