const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    editing: false,
  });
};
exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
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
      });
    }
  });
};
exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
    });
  });
};

exports.postRemoveHostHome = (req, res, next) => {
  console.log("Received request to remove home with ID:", req.body);
  Home.removeHostHome(req.body.id, (err) => {
    if (err) {
      console.error("Error removing home:", err);
    } else {
      res.redirect("/host/host-home-list");
    }
  });
};
