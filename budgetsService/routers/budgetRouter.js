const express = require('express');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

router.post("", budgetController.createBudget);

module.exports = router;