const { default: axios } = require("axios");
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
    },
    expenseSumPerMonth: async (userID, month, year) => {
        try {
            const expenses = await expenseDAO.findByUserId(userID);
            if (!expenses) {
                const error = new Error("No expenses found for this user")
                error.code = 404
                throw error
            }

            const sum = expenses.map(expense => expense.dataValues)
            .reduce((total, expense) => {
                const expDate = new Date(expense.date);
                if (expDate.getMonth() + 1 == month && expDate.getFullYear() == year) {
                    return total + parseFloat(expense.amount);
                } else {
                    return total;
                }
            }, 0);

            return sum;
        } catch (err) {
            console.log(err.message)

            if(err.code === 404) throw err

            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    },
    getExpensePerMnYByUserId: async (userID, month, year) => {
        try{
            const expenses = await expenseDAO.findByUserId(userID)

            const userCategories_response = await axios.get(`http://localhost:3002/api/category/user/${userID}`)
            const userCategories = Array.from(userCategories_response.data)

            const filteredExpenses = expenses.map(
                expense => expense.dataValues
            ).filter(
                expense => {
                    const expDate = new Date(expense.date)
                    if(expDate.getMonth() + 1 == month && expDate.getFullYear() == year)
                        for (let i = 0; i < userCategories.length; i++) {
                            if (userCategories[i].categoryID == expense.categoryID && userCategories[i].userID == userID) {
                                expense.categoryName = userCategories[i].name
                                return expense
                            }
                        }
                }
            )

            return filteredExpenses
        } catch (err) {
            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    },
    expenseGroupByCategory: async (userID, month, year) => {
        try {
            const expenses = await expenseDAO.findByUserId(userID)

            const userCategories_response = await axios.get(`http://localhost:3002/api/category/user/${userID}`)
            const userCategories = Array.from(userCategories_response.data)

            const groupedExpenses = {}

            userCategories.forEach(
                userCategory => {
                    groupedExpenses[userCategory.categoryID] = 0
                }
            )

            expenses.forEach(
                expense => {
                    groupedExpenses[expense.dataValues.categoryID] += parseFloat(expense.dataValues.amount)
                }
            )

            const groupedExpensesWithNames = {}

            userCategories.forEach(
                userCategory => {
                    if (groupedExpenses[userCategory.categoryID] !== undefined) {
                        groupedExpensesWithNames[userCategory.name] = groupedExpenses[userCategory.categoryID]
                    }
                }
            )

            return groupedExpensesWithNames
        } catch (err) {
            console.log(err.message)

            const error = new Error("Internal server error")
            error.code = 500
            throw error
        }
    }
}

module.exports = expenseServices;