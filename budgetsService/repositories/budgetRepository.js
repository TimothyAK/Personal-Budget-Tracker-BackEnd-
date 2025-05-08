const Budgets = require('../models/budget');

const budgetDao = {
    create: async (budgetData) => {
        return await Budgets.create(budgetData);
    },

    findById: async (id) => {
        return await Budgets.findByPk(id);
    },

    findByUserId: async (userID) => {
        return await Budgets.findAll({
            where: {
                userID: userID
            }
        });
    },

    update: async (id, updateData) => {
        const budget = await Budgets.findByPk(id);
        if (!budget) return null;
        return await budget.update(updateData);
    },

    delete: async (id) => {
        const budget = await Budgets.findByPk(id);
        if (!budget) return null;
        await budget.destroy();
        return true;
    }
};

module.exports = budgetDao;