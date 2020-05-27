const Sequelize = require("sequelize");
const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.TEXT,
    },
    isPremium: {
      type: Sequelize.SMALLINT,
    },
    isPremium: {
      type: Sequelize.TEXT,
    },
  },
  {
    tableName: "users",
  }
);
module.exports = User;
