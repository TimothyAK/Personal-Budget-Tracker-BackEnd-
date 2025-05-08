const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get("/user/:userID", categoryController.getCategoriesByUserId);
router.get("/:userID/:categoryID", categoryController.getCategoryById);
router.post("", categoryController.createCategory);
router.put("/:userID/:categoryID/name", categoryController.updateCategoryName);
router.put("/:userID/:categoryID/color", categoryController.updateCategoryColor);
router.delete("/:userID/:categoryID", categoryController.deleteCategory);

module.exports = router;