const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};
exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home.save().then(() => {
    console.log("Home added successfully to the database");
    res.redirect("/host/host-home-list");
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found with ID for editing:", homeId);
      return res.redirect("/host/host-home-list");
    } else if (!editing) {
      return res.redirect("/host/host-home-list");
    } else {
      console.log("Editing home with ID:", homeId, editing, home);
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Home Details",
        editing: "editing",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;

      return home.save();
    })
    .then((result) => {
      console.log("result:", result);
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while updating/finding the home", err);
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postRemoveHostHome = (req, res, next) => {
  console.log("Received request to remove home with ID:", req.body);
  Home.findByIdAndDelete(req.body.id)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.error("Error removing home:", err);
    });
};
