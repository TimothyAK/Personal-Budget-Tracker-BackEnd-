const { col } = require('sequelize');
const categoryService = require('../services/categoryService');

const categoryController = {
    createCategory: async (req, res) => {
        const { userID, name } = req.body;

        if (
            typeof userID !== 'number' || userID <= 0 ||
            typeof name !== 'string' || name.length < 1
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const newCategory = await categoryService.createCategory({
                userID, name
            });

            res.send(newCategory);
            res.status(200).end();
        } catch (err) {
            res.status(err.code).end(err.message);
        }
    },
    getCategoryById: async (req, res) => {
        const { userID, categoryID } = req.params;

        if (
            isNaN(userID) || userID <= 0 ||
            isNaN(categoryID) || categoryID <= 0
        ) {
            res.status(400).end("Invalid request parameters");
            return;
        }
        
        try {
            const category = await categoryService.getCategoryById(userID, categoryID);

            res.send(category);
            res.status(200).end();
        } catch (err) {
            res.status(err.code).end(err.message);
        }
    },
    getCategoriesByUserId: async (req, res) => {
        const userID = req.params.userID;

        if (isNaN(userID) || userID <= 0) {
            res.status(400).end("Invalid user ID");
            return;
        }

        try {
            const categories = await categoryService.getCategoriesByUserId(userID);

            res.send(categories);
            res.status(200).end();
        } catch (err) {
            res.status(err.code).end(err.message);
        }
    },
    updateCategoryName: async (req, res) => {
        const { userID, categoryID } = req.params;
        const { name } = req.body;

        if (
            isNaN(userID) || userID <= 0 ||
            isNaN(categoryID) || categoryID <= 0
        ) {
            res.status(400).end("Invalid request parameters");
            return;
        }

        if (
            typeof name !== 'string' || name.length < 1
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const updatedCategory = await categoryService.updateName(userID, categoryID, name);

            res.send(updatedCategory);
            res.status(200).end();
        } catch (err) {
            console.log(err)
            res.status(err.code).end(err.message);
        }
    },
    updateCategoryColor: async (req, res) => {
        const { userID, categoryID } = req.params;
        const { colorHex } = req.body;

        if (
            isNaN(userID) || userID <= 0 ||
            isNaN(categoryID) || categoryID <= 0
        ) {
            res.status(400).end("Invalid request parameters");
            return;
        }

        if (typeof colorHex !== 'string' || colorHex.length < 1) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const updatedCategory = await categoryService.updateColorHex(userID, categoryID, colorHex);

            res.send(updatedCategory);
            res.status(200).end();
        } catch (err) {
            console.log(err)
            res.status(err.code).end(err.message);
        }
    },
    deleteCategory: async (req, res) => {
        const { userID, categoryID } = req.params;

        if (
            isNaN(userID) || userID <= 0 || 
            isNaN(categoryID) || categoryID <= 0
        ) {
            res.status(400).end("Invalid request parameters");
            return;
        }

        try {
            await categoryService.deleteCategory(userID, categoryID);

            res.status(200).end();
        } catch (err) {
            console.log(err)
            res.status(err.code).end(err.message);
        }
    },
}

module.exports = categoryController;