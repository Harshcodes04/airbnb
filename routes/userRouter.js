const express = require("express");
const path = require("path");
const userRouter = express.Router();
const rootDir = require("../utils/pathUtil");
const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
  console.log(registeredHomes);
});

module.exports = userRouter;
