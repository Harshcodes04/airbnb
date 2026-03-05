const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/bookings", storeController.getbookings);
storeRouter.get("/favourites", storeController.getfavouriteList);
storeRouter.post("/favourites", storeController.postAddTofavourite);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

module.exports = storeRouter;
