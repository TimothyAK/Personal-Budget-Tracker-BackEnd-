const express = require('express');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

router.get("/:budgetID", budgetController.getBudgetById);
router.get("/user/:userID", budgetController.getBudgetByUserId);
router.post("", budgetController.createBudget);
router.put("/:budgetID", budgetController.updateBudget);
router.delete("/:budgetID", budgetController.deleteBudget);

module.exports = router;