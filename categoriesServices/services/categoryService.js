const CategoryDAO = require("../repositories/categoryRepository");

const categoryServices = {
    createCategory: async ({ userID, name }) => {
        try {
            const categories = await CategoryDAO.findByUserId(userID);
            for (let category of categories) {
                if (category.name === name) {
                    const error = new Error('Category already exists');
                    error.code = 409;
                    throw error;
                }
            }

            return await CategoryDAO.create({ 
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
            const category = await CategoryDAO.findById(userID, categoryID);
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
            return await CategoryDAO.findByUserId(userID);
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    updateCategory: async (categoryID, updateData) => {
        try {
            const existingCategory = await CategoryDAO.findById(categoryID);
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.code = 404;
                throw error;
            }

            return await CategoryDAO.update(categoryID, updateData);
        } catch (err) {
            if (err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    }
}

module.exports = categoryServices;