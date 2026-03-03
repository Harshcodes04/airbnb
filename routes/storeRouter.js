const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/bookings", storeController.getbookings);
storeRouter.get("/favourites", storeController.getfavouriteList);
storeRouter.get("/homes", storeController.getHomes);

module.exports = storeRouter;
