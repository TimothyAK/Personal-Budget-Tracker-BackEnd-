const e = require("express");
const categoryDAO = require("../repositories/categoryRepository");

const categoryServices = {
    createCategory: async ({ userID, name }) => {
        try {
            const categories = await categoryDAO.findByUserId(userID);
            for (let category of categories) {
                if (category.name === name) {
                    const error = new Error('Category already exists');
                    error.code = 409;
                    throw error;
                }
            }

            return await categoryDAO.create({ 
                userID: userID,
                categoryID: categories.length + 1,
                name: name,
                colorHex: "#000000",
            });
        } catch (err) {
            if (err.code === 409) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    getCategoryById: async (userID, categoryID) => {
        try {
            const category = await categoryDAO.findById(userID, categoryID);
            if (!category) {
                const error = new Error('Category not found');
                error.code = 404;
                throw error;
            }

            return category;
        } catch (err) {
            if (err.code === 404) throw err;

            console.log(err.message)

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    getCategoriesByUserId: async (userID) => {
        try {
            return await categoryDAO.findByUserId(userID);
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },
    updateName: async (userID, categoryID, name) => {
        try {
            const existingCategory = await categoryDAO.findById(userID, categoryID);
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.code = 404;
                throw error;
            }
    
            const updateData = {
                name: name,
                colorHex: existingCategory.dataValues.colorHex,
            }

            return await categoryDAO.update(userID, categoryID, updateData);
        } catch (err) {
            console.log(err)
            if (err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },
    updateColorHex: async (userID, categoryID, colorHex) => {
        try {
            const existingCategory = await categoryDAO.findById(userID, categoryID);
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.code = 404;
                throw error;
            }
    
            const updateData = {
                name: existingCategory.dataValues.name,
                colorHex: colorHex,
            }

            return await categoryDAO.update(userID, categoryID, updateData);
        } catch (err) {
            console.log(err)
            if (err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },
    deleteCategory: async (userID, categoryID) => {
        try {
            const existingCategory = await categoryDAO.findById(userID, categoryID);
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.code = 404;
                throw error;
            }

            return await categoryDAO.delete(userID, categoryID);
        } catch (err) {
            if (err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },
}

module.exports = categoryServices;