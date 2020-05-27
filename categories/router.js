const { Router } = require("express");

const Category = require("./model");

const router = Router();

router.get("/categories/:categoryId", async (req, res, next) => {
  try {
    console.log("hi");
    const { categoryId } = req.params;
    console.log(categoryId);
    const getCategory = await Category.findByPk(categoryId);
    res.send(getCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
