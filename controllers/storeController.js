const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
    });
  });
};
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
    });
  });
};

exports.getbookings = (req, res, next) => {
  res.render("store/bookings", {
    // registeredHomes: registeredHomes,
    pageTitle: "Your Bookings",
  });
};

exports.getfavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) => {
        return favourites.includes(home.id);
      });
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Your Favourites",
      });
    });
  });
};

exports.postAddTofavourite = (req, res, next) => {
  Favourite.addToFavourites(req.body.id, (err) => {
    if (err) {
      console.error("Error adding home to favourites:", err);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFromfavourite = (req, res, next) => {
  console.log(
    "Received request to remove home from favourites with ID:",
    req.body,
  );
  Favourite.removeFavourites(req.body.id, (err) => {
    if (err) {
      console.error("Error removing home from favourites:", err);
    } else {
      res.redirect("/favourites");
    }
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes]) => {
    const home = home[0];
    if (!home) {
      res.redirect("/homes");
      console.log("Home not found for ID:", homeId);
    } else {
      res.render("store/home-detail", {
        pageTitle: "Home detail",
        home: home,
      });
    }
  });
};
