const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
    });
  });
};
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
    });
  });
};

exports.getbookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Your Bookings",
  });
};

exports.getfavouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => {
      return fav.houseId;
    });
    Home.fetchAll().then((registeredHomes) => {
      console.log("Favourites:", favourites);
      const favouriteHomes = registeredHomes.filter((home) => {
        return favourites.includes(home._id.toString());
      });
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Your Favourites",
      });
    });
  });
};

exports.postAddTofavourite = (req, res, next) => {
  const houseId = req.body.id;
  const fav = new Favourite(houseId);
  fav
    .save()
    .then((result) => {
      console.log("Fav added", result);
    })
    .catch((err) => {
      console.log("Error while marking favourite", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromfavourite = (req, res, next) => {
  console.log(
    "Received request to remove home from favourites with ID:",
    req.body,
  );
  Favourite.removeFavourites(req.body.id)
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
      });
    }
  });
};
