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
    }
}

module.exports = budgetController