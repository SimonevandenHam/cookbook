const { Router } = require("express");
const bcrypt = require("bcrypt");

const { toJWT, toData } = require("./jwt");
const User = require("../userCreate/model");

const router = new Router();

router.post("/user/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  if (!name || !password) {
    res.status(400).send({
      message: "Please supply a valid name and password",
    });
  }
  // find user based on name
  User.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "User with that name does not exist",
        });
      }
      // use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, user.password)) {
        // if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: user.id }),
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong",
      });
    });
});

module.exports = router;
