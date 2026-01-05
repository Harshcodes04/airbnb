const Home = require("../models/homes");
const registeredHomes = [];

exports.getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb home",
    });
  });
};

exports.getHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    registeredHomes: registeredHomes,
    pageTitle: "My bookings",
  });
};
exports.getfavouritelist = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
    });
  });
};
