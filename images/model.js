const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define(
  "image",
  {
    image: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "images",
  }
);
module.exports = Image;
