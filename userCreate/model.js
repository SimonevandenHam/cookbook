const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);
module.exports = User;
