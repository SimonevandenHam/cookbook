const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userCreateRouter = require("./userCreate/router");
const userLoginRouter = require("./userLogin/router");
const categoryRouter = require("./categories/router");
const recipeRouter = require("./recipe/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(express.json());

app.get("/", (req, res) => res.send());

app
  .use(userCreateRouter)
  .use(userLoginRouter)
  .use(categoryRouter)
  .use(recipeRouter);

const port = process.env.PORT || 4000;

function confirm() {
  console.log(`Listening on :${port}`);
}

app.listen(port, confirm);
