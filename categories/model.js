const Sequelize = require("sequelize");
const db = require("../db");

const Category = db.define(
  "category",
  {
    category: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
  }
);
module.exports = Category;
