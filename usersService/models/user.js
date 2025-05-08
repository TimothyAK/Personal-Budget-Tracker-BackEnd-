require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    dialectModule: require("mysql2")
})

const userDataTypes = {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}

const tableConfig = {
    tableName: 'users', // exact table name 
    freezeTableName: true, // prevents automatic pluralization
    timestamps: false
}

const Users = sequelize.define("users", userDataTypes, tableConfig);  

sequelize.sync();

module.exports = Users;