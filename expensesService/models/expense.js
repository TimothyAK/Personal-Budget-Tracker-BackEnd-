require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    dialectModule: require("mysql2")
})

const categoryDataType = {
    expenseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

const tableConfig = {
    tableName: 'expenses', // exact table name 
    freezeTableName: true, // prevents automatic pluralization
    timestamps: false
}

const Expenses = sequelize.define("expenses", categoryDataType, tableConfig);

sequelize.sync();

module.exports = Expenses;