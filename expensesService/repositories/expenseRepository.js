const Expenses = require("../models/expense.js")

const expenseDAO = {
    create: async (expenseData) => {
        return await Expenses.create(expenseData);
    },

    findById: async (expenseID) => {
        return await Expenses.findByPk(expenseID);
    },

    findByUserId: async (userID) => {
        return await Expenses.findAll({
            where: {
                userID: userID
            }
        });
    },

    update: async (expenseID, updateData) => {
        const expense = await Expenses.findByPk(expenseID);
        if (!expense) return null;
        return await expense.update(updateData);
    },

    delete: async (expenseID) => {
        const expense = await Expenses.findByPk(expenseID)
        if (!expense) return null;
        await expense.destroy();
        return true;
    }
}

module.exports = expenseDAO;