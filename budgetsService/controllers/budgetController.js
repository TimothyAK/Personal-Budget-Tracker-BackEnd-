const budgetService = require("../services/budgetService")

const budgetController = {
    createBudget: async (req, res) => {
        const { userID, amount, month, year } = req.body

        if (
            typeof userID !== 'number' || userID <= 0 ||
            typeof amount !== 'number' || amount <= 0 ||
            typeof month !== 'number' || month < 1 || month > 12 ||
            typeof year !== 'number' || year < 2000
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const newBudget = await budgetService.createBudget({
                userID, amount, month, year
            })

            res.send(newBudget)
            res.status(200).end() 
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    getBudgetById: async (req, res) => {
        const budgetID = req.params.budgetID

        if (isNaN(budgetID) || budgetID <= 0) {
            res.status(400).end("Invalid budget ID");
            return;
        }

        try {
            const budget = await budgetService.getBudgetById(budgetID)
            
            res.send(budget)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    getBudgetByUserId: async (req, res) => {
        const userID = req.params.userID

        if (isNaN(userID) || userID <= 0) {
            res.status(400).end("Invalid user ID");
            return;
        }

        try {
            const budgets = await budgetService.getBudgetsByUserId(userID)
            
            res.send(budgets)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    updateBudget: async (req, res) => {
        const budgetID = req.params.budgetID
        const { amount, month, year } = req.body

        if (isNaN(budgetID) || budgetID <= 0) {
            res.status(400).end("Invalid budget ID");
            return;
        }

        if (
            typeof amount !== 'number' || amount <= 0 ||
            typeof month !== 'number' || month < 1 || month > 12 ||
            typeof year !== 'number' || year < 2000
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const updatedBudget = await budgetService.updateBudget(budgetID, { amount, month, year })
            
            res.send(updatedBudget)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    }
}

module.exports = budgetController