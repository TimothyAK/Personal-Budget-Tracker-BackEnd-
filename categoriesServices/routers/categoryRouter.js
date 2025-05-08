const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post("/:userID", categoryController.getCategoryById);
router.post("", categoryController.createCategory);

module.exports = router;