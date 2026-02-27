const express = require("express");
const path = require("path");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.url, req.method);
  console.log(req.body, req.body.houseName);

  registeredHomes.push({ houseName: req.body.houseName });

  res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
