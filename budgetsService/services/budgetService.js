const axios = require("axios")
const budgetDAO = require("../repositories/budgetRepository");

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
            const existingBudget = await budgetDAO.findById(budgetID);
            if (!existingBudget) {
                const error = new Error('Budget not found');
                error.code = 404;
                throw error;
            }
            
            const budgets = await budgetDAO.findByUserId(existingBudget.dataValues.userID)
            for(let budget of budgets) {
                if (budget.budgetID == budgetID) continue;
                console.log(budget.budgetID, budgetID)
                if (budget.month === updateData.month && budget.year === updateData.year) {
                    const error = new Error('Budget already exists for this month and year');
                    error.code = 409;
                    throw error;
                }
            }

            updateData.userID = existingBudget.dataValues.userID;
    
            return await budgetDAO.update(budgetID, updateData);
        } catch (err) {
            if(err.code === 404 || err.code === 409) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    deleteBudget: async (budgetID) => {
        try {
            const existingBudget = await budgetDAO.findById(budgetID);
            if (!existingBudget) {
                const error = new Error('Budget not found');
                error.code = 404;
                throw error;
            }
    
            return await budgetDAO.delete(budgetID);
        } catch (err) {
            if(err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    checkBudgetExpense: async (userID, month, year) => {
        try {
            const expenses_sum_response = await axios.post(`http://localhost:3003/api/expense/mny/sum`, {
                userID, month, year
            })
            const expenses_sum = expenses_sum_response.data

            const budgets = await budgetDAO.findByUserId(userID)
            const bF = budgets
                .filter(budget => budget.month === month && budget.year === year)
                .map(budget => parseFloat(budget.dataValues.amount))
        
            const expBudRatio = expenses_sum / bF[0]

            return expBudRatio;
        } catch (err) {
            console.log(err.message)

            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    }
}

module.exports = budgetServices;