const { Router } = require("express");
const bcrypt = require("bcrypt");

const { toJWT, toData } = require("./jwt");
const User = require("../userCreate/model");

const router = new Router();

router.post("user/login", (req, res) => {
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

router.get("/secret-endpoint", (req, res) => {
  // do we have req.headers.authorization && if so: split the header on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  // is auth something && is the first element a string "Bearer" && do we have a token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // verify the token and get me the information inside (toData(auth[1]))
    const data = toData(auth[1]);
    res.send({
      message: "Thanks for visiting the secret endpoint.",
      data,
    });
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
