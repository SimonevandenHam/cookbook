const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define(
  "recipes",
  {
    recipeImage: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    userImage: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Recipies",
  }
);
module.exports = Image;
