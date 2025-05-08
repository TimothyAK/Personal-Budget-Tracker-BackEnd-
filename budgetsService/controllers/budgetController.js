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
        const { userID, page } = req.params

        if (
            isNaN(userID) || userID <= 0 || 
            isNaN(page) || page <= 0
        ) {
            res.status(400).end("Invalid request parameters");
            return;
        }

        try {
            const budget = await budgetService.getBudgetsByUserId(userID)
            
            const pageSize = 10
            const startIndex = (page - 1) * pageSize
            const paginatedBudget = budget.slice(startIndex, startIndex + pageSize)

            res.send(paginatedBudget)
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
    },
    deleteBudget: async (req, res) => {
        const budgetID = req.params.budgetID
            
        if (isNaN(budgetID) || budgetID <= 0) {
            res.status(400).end("Invalid budget ID");
            return;
        }

        try {
            await budgetService.deleteBudget(budgetID)
            
            res.status(204).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    checkBudgetExpense: async (req, res) => {
        const { userID, month, year } = req.body

        if (
            isNaN(userID) || userID <= 0 || 
            typeof month !== 'number' || month < 1 || month > 12 ||
            typeof year !== 'number' || year < 2000
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const budgetWarn = await budgetService.checkBudgetExpense(userID, month, year)

            res.send(budgetWarn)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    getBudgetperMnYbyUserId: async (req, res) => {
        const { userID, month, year } = req.body

        if (
            isNaN(userID) || userID <= 0 || 
            typeof month !== 'number' || month < 1 || month > 12 ||
            typeof year !== 'number' || year < 2000
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const budget = await budgetService.getBudgetPerMnYbyUserId(userID, month, year)

            res.send(budget)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    }
}

module.exports = budgetController