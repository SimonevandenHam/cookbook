const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define(
  "image",
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
    tableName: "images",
  }
);
module.exports = Image;
