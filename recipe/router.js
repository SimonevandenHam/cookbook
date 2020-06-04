const { Router } = require("express");
const bcrypt = require("bcrypt");

const Recipe = require("./model");
const User = require("../userCreate/model");
const auth = require("../userLogin/loginMiddleware");
const Category = require("../categories/model");

const router = Router();

router.post("/recipe/new", auth, async (req, res, next) => {
  try {
    const {
      name,
      cookingTime,
      recipeDiscription,
      ingredients,
      recipeNotes,
      isFavorite,
      numberOfServings,
    } = req.body.recipe;
    const entity = {
      name,
      cookingTime,
      recipeDiscription,
      ingredients,
      recipeNotes,
      isFavorite,
      numberOfServings,
    };
    const newRecipe = await Recipe.create(entity);

    const dbUser = await User.findByPk(req.user.id);
    await dbUser.addRecipe(newRecipe.id);
    const recipe = await Recipe.findByPk(newRecipe.id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/recipe/list", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Recipe.findAll({
      where: { userId: userId },
      include: [Category],
    }).then((recipes) => {
      console.log(recipes);
      res.send(recipes);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/recipe/:recipeId", auth, async (req, res, next) => {
  try {
    const { recipeId } = request.params;
    const query = {
      include: [Category],
    };
    const getRecipe = await Recipe.findByPk(recipeId, query);
    res.send(getRecipe);
  } catch (error) {
    next(error);
  }
});

router.put("/recipe/:reci[eId");

router.post("/recipe/:recipeId/recipeimage");

router.post("/recipe/:recipeId/userimage");

router.delete("/recipe/:recipeId", (req, res, next) =>
  Recipe.destroy({ where: { recipeId: req.params.id } })
    .then((number) => res.send({ number }))
    .catch(next)
);

router.delete("/recipe/:imageId");

module.exports = router;

// POST /recipe/new
// GET /recipe/list
// GET /recipe/{recipe_id}
// PUT /recipe/{recipe_id} (opslaan wijzigingen)
// POST /recipe/{recipe_id}/recipe_image
// POST /recipe/{recipe_id}/user_image
// DELETE /recipe/{recipe_id}
// DELETE /recipe/{image_id}
