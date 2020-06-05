const { Router } = require("express");
const bcrypt = require("bcrypt");

const auth = require("../userLogin/loginMiddleware");
const Recipe = require("./model");
const User = require("../userCreate/model");
const Category = require("../categories/model");
const Image = require("../images/model");

const router = Router();

router.post("/recipe/new", auth, async (req, res, next) => {
  try {
    const {
      name,
      cookingTime,
      recipeDescription,
      ingredients,
      recipeNotes,
      isFavorite,
      numberOfServings,
    } = req.body.recipe;
    const entity = {
      name,
      cookingTime,
      recipeDescription,
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

router.post("/recipe/:recipeId/recipeimage", auth, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const getRecipe = await Recipe.findByPk(recipeId);

    const { image, type } = req.body.image;
    const entity = { image, type };

    const addImage = await Image.create(entity);

    const dbUser = await User.findByPk(req.user.id);
    await dbUser.addImage(getRecipe.id);
    const recipe = await Recipe.findByPk(addImage.id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.post("/recipe/:recipeId/userimage", auth, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/recipe/list", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Recipe.findAll({
      where: { userId: userId },
      include: [Category, Image],
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
    const { recipeId } = req.params;
    const query = {
      include: [Category],
    };
    const getRecipe = await Recipe.findByPk(recipeId, query);
    res.send(getRecipe);
  } catch (error) {
    next(error);
  }
});

router.put("/recipe/edit/:recipeId", auth, (req, res, next) => {
  Recipe.findByPk(req.params.recipeId)
    .then((recipe) => {
      if (recipe) {
        recipe.update(req.body).then((recipe) => res.json(recipe));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

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
