const axios = require("axios")
const budgetDAO = require("../repositories/budgetRepository")

const budgetServices = {
    createBudget: async ({ userID, amount, month, year }) => {
        try {
            const budgets = await budgetDAO.findByUserId(userID)
            for(let budget of budgets) {
                if (budget.month === month && budget.year === year) {
                    const error = new Error('Budget already exists for this month and year');
                    error.code = 409;
                    throw error;
                }
            }

            return await budgetDAO.create({ userID, amount, month, year })
        } catch (err) {
            if(err.code === 409) throw err;
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    getBudgetById: async (budgetID) => {
        try {
            const budget = await budgetDAO.findById(budgetID)
            if(!budget) {
                const error = new Error('Budget not found');
                error.code = 404;
                throw error;
            }

            return budget
        } catch (err) {
            if(err.code === 404) throw err;

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