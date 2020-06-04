const Sequelize = require("sequelize");
const db = require("../db");

const User = require("../userCreate/model");
const Category = require("../categories/model");
const Image = require("../images/model");

const Recipe = db.define(
  "recipe",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cookingTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipeDescription: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    recipeNotes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    isFavorite: {
      type: Sequelize.SMALLINT,
    },
    numberOfServings: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "Recipies",
  }
);

//RELATION
Recipe.belongsTo(User);
User.hasMany(Recipe);

Recipe.belongsTo(Category);
Category.hasMany(Recipe);

Image.belongsTo(Recipe);
Recipe.hasMany(Image);

module.exports = Recipe;
