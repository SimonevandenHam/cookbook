const { Router } = require("express");
const bcrypt = require("bcrypt");

const Recipe = require("./model");
const User = require("../userCreate/model");
const auth = require("../userLogin/loginMiddleware");

const router = Router();

router.post("recipe/new", auth, async (req, res, next) => {
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
    dbUser.addRecipe(newConcert.id);
    res.send(newRecipe);
  } catch (error) {
    next(error);
  }
});

router.delete("/recipe/:id", (request, response, next) =>
  Recipe.destroy({ where: { id: request.params.id } })
    .then((number) => response.send({ number }))
    .catch(next)
);

module.exports = router;

// POST /recipe/new
// GET /recipe/list
// GET /recipe/{recipe_id}
// PUT /recipe/{recipe_id} (opslaan wijzigingen)
// POST /recipe/{recipe_id}/recipe_image
// POST /recipe/{recipe_id}/user_image
// DELETE /recipe/{recipe_id}
// DELETE /recipe/{image_id}
