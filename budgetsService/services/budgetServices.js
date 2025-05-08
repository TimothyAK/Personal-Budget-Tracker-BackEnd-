const axios = require("axios")
const budgetDAO = require("../repositories/budgetRepository")

const budgetServices = {
    createBudget: async ({ userID, amount, month, year }) => {
        return await budgetDAO.create({ userID, amount, month, year })
    },

    getBudgetById: async (budgetID) => {
        try {
            return await budgetDAO.findById(budgetID)
        } catch {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    getBudgetsByUserId: async (userID) => {
        try {
            return await budgetDAO.findByUserId(userID)
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    updateBudget: async (budgetID, updateData) => {
        try {
            const existingBudget = await budgetDAO.readById(budgetID);
            if (!existingBudget) {
                const error = new Error('Budget not found');
                error.code = 404;
                throw error;
            }
    
            return await budgetDAO.update(budgetID, updateData);
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    deleteBudget: async (budgetID) => {
        try {
            const existingBudget = await budgetDAO.readById(budgetID);
            if (!existingBudget) {
                const error = new Error('Budget not found');
                error.code = 404;
                throw error;
            }
    
            return await budgetDAO.delete(budgetID);
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    }
}

module.exports = budgetServices;