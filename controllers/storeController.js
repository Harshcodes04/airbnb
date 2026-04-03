const Home = require("../models/home");
const User = require("../models/user");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
      isLoggedIn: req.session.isLoggedIn || false,
      user: req.session.user || null,
    });
  });
};
exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      isLoggedIn: req.session.isLoggedIn || false,
      user: req.session.user || null,
    });
  });
};

exports.getbookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Your Bookings",
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user || null,
  });
};

exports.getfavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "Your Favourites",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddTofavourite = async (req, res, next) => {
  const houseId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(houseId)) {
    user.favourites.push(houseId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postRemoveFromfavourite = async (req, res, next) => {
  const houseId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(houseId)) {
    user.favourites = user.favourites.filter((favId) => favId.toString() !== houseId);
    await user.save();
  }
  res.redirect("/favourites");
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
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || null,
      });
    }
  });
};
