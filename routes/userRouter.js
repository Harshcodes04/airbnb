const express = require("express");
const path = require("path");
const userRouter = express.Router();
const { registeredHomes } = require("./hostRouter");
const { register } = require("module");

userRouter.get("/", (req, res, next) => {
  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
  });
  console.log(registeredHomes);
});

module.exports = userRouter;
