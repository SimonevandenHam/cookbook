const express = require("express");
const cors = require("cors");

const UserCreateRouter = require("./userCreate/router");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send());

app.use(UserCreateRouter);

const port = process.env.PORT || 4000;

function confirm() {
  console.log(`Listening on :${port}`);
}

app.listen(port, confirm);
