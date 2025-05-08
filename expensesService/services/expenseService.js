const expenseDAO = require("../repositories/expenseRepository");

const expenseServices = {
    createExpense: async ({ description, amount, date, userID, categoryID }) => {
        try {
            return await expenseDAO.create({ description, amount, date, userID, categoryID });
        } catch (err) {
            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },
    getExpenseById: async (expenseID) => {
        try {
            const expense = await expenseDAO.findById(expenseID);
            if(!expense) {
                const error = new Error("Expense not found")
                error.code = 404
                throw error
            }

            return expense
        } catch (err) {
            if(err.code === 404) throw err

            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    },
    getExpenseByUserId: async (userID) => {
        try{
            const expenses = await expenseDAO.findByUserId(userID)

            return expenses
        } catch (err) {
            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    },
    updateExpense: async (expenseID, updateData) => {
        try {
            const existingExpense = await expenseDAO.findById(expenseID);
            if(!existingExpense) {
                const error = new Error("Expense not found")
                error.code = 404
                throw error
            }

            updateData.userID = existingExpense.dataValues.userID
            updateData.categoryID = existingExpense.dataValues.categoryID

            return await expenseDAO.update(expenseID, updateData)
        } catch (err) {
            if (err.code === 404) throw err
            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    },
    deleteExpense: async (expenseID) => {
        try {
            const existingExpense = await expenseDAO.findById(expenseID);
            if(!existingExpense) {
                const error = new Error("Expense not found")
                error.code = 404
                throw error
            }

            return await expenseDAO.delete(expenseID);
        } catch (err) {
            if(err.code === 404) throw err

            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    }
}

module.exports = expenseServices;