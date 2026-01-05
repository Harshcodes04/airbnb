const express = require("express");
const path = require("path");
const storeRouter = express.Router();
const storeControllers = require("../controllers/storeController");
storeRouter.get("/", storeControllers.getIndex);
storeRouter.get("/bookings", storeControllers.getBookings);
storeRouter.get("/homes", storeControllers.getHomes);
storeRouter.get("/favourites", storeControllers.getfavouritelist);
module.exports = storeRouter;
