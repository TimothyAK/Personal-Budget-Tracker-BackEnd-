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
}

module.exports = expenseServices;