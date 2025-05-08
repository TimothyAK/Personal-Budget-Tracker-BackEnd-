const { DATEONLY } = require("sequelize");
const expenseService = require("../services/expenseService");

const expenseController = {
    createExpense: async (req, res) => {
        const { description, amount, date, userID, categoryID } = req.body;

        console.log(/^\d{4}-\d{2}-\d{2}$/.test(date))

        if (
            typeof description !== 'string' || description.trim() === '' ||
            typeof amount !== 'number' || amount <= 0 ||
            typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
            typeof userID !== 'number' || userID <= 0 ||
            typeof categoryID !== 'number' || categoryID <= 0
        ) {
            return res.status(400).end("Invalid request body" );
        }

        try {
            const expense = await expenseService.createExpense({ description, amount, date, userID, categoryID });
            return res.status(201).end(expense);
        } catch (err) {
            return res.status(err.code).end(err.message);
        }
    },
    getExpenseById: async (req, res) => {
        const expenseID = req.params.expenseID;
        if(isNaN(expenseID) || expenseID <= 0) {
            res.status(400).end("Invalid expense ID")
        }

        try {
            const expense = await expenseService.getExpenseById(expenseID)

            res.send(expense)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    }
}

module.exports = expenseController;