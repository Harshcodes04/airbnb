const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
      isLoggedIn: req.isLoggedIn,
    });
  });
};
exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getbookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Your Bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getfavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites
        .map((fav) => fav.houseId)
        .filter((home) => home !== null);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Your Favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddTofavourite = (req, res, next) => {
  const houseId = req.body.id;
  Favourite.findOne({ houseId: houseId })
    .then((result) => {
      if (result) {
        res.redirect("/favourites");
      }
      const fav = new Favourite({ houseId: houseId });
      return fav.save();
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while marking favourite", err);
    });
};

exports.postRemoveFromfavourite = (req, res, next) => {
  console.log(
    "Received request to remove home from favourites with ID:",
    req.body,
  );
  Favourite.findOneAndDelete({ houseId: req.body.id })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.error("Error removing home from favourites:", err);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/homes");
      console.log("Home not found for ID:", homeId);
    } else {
      res.render("store/home-detail", {
        pageTitle: "Home detail",
        home: home,
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};
