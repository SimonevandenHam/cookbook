const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("./model");

const router = Router();

router.post("/user/create", async (req, res, next) => {
  try {
    const { name, email, password } = req.body.user;

    if (name === "") {
      res.status(400).send({
        message: "name can not be empty",
      });
    }
    if (email === "") {
      res.status(400).send({
        message: "email can not be empty",
      });
    }
    if (password === "") {
      res.status(400).send({
        message: "password can not be empty",
      });
    } else {
      const scrambled = bcrypt.hashSync(password, 10);
      const entity = { name, email, password: scrambled };
      const user = await User.create(entity);
      res.send(user);

      try {
        const user = await User.create(entity);

        res.send(user);
      } catch (error) {
        res.send({ error: "values not valid" });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
