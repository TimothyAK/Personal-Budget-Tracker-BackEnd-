const Categories = require("../models/category");

const categoryDAO = {
    create: async (categoryData) => {
        return await Categories.create(categoryData);
    },

    findById: async (userID, categoryID) => {
        return await Categories.findOne({
            where: {
                userID: userID,
                categoryID: categoryID
            }
        });
    },

    findByUserId: async (userID) => {
        return await Categories.findAll({
            where: {
                userID: userID
            }
        });
    },

    update: async (userID, categoryID, updateData) => {
        const category = await Categories.findOne({
            where: {
                userID: userID,
                categoryID: categoryID
            }
        });
        if (!category) return null;
        return await category.update(updateData);
    },

    delete: async (userID, categoryID) => {
        const category = await Categories.findOne({
            where: {
                userID: userID,
                categoryID: categoryID
            }
        });
        if (!category) return null;
        await category.destroy();
        return true;
    }
}

module.exports = categoryDAO;