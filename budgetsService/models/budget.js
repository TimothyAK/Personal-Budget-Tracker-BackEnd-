require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    dialectModule: require("mysql2")
})

const budgetDataTypes = {
    budgetID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}

const tableConfig = {
    tableName: 'budgets', // exact table name 
    freezeTableName: true, // prevents automatic pluralization
    timestamps: false
}

const Budgets = sequelize.define("budgets", budgetDataTypes, tableConfig);

sequelize.sync();

module.exports = Budgets;