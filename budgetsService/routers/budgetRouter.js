const express = require('express');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

router.get("/budget/:budgetID", budgetController.getBudgetById);
router.get("/user/:userID", budgetController.getBudgetByUserId);
router.post("", budgetController.createBudget);

module.exports = router;