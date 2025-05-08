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
            return res.status(400).json({ message: "Invalid request body" });
        }

        try {
            const expense = await expenseService.createExpense({ description, amount, date, userID, categoryID });
            return res.status(201).json(expense);
        } catch (err) {
            return res.status(err.code || 500).json({ message: err.message });
        }
    },
}

module.exports = expenseController;