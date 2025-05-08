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
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    colorHex: {
      type: DataTypes.STRING(7),
      allowNull: false,
    }
}

const tableConfig = {
    tableName: 'categories', // exact table name 
    freezeTableName: true, // prevents automatic pluralization
    timestamps: false
}

const Categories = sequelize.define("categories", categoryDataType, tableConfig);  

sequelize.sync();

module.exports = Categories;