const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get("/:userID", categoryController.getCategoriesByUserId);
router.post("/:userID", categoryController.getCategoryById);
router.post("", categoryController.createCategory);
router.put("/:userID/name", categoryController.updateCategoryName);
router.put("/:userID/color", categoryController.updateCategoryColor);

module.exports = router;