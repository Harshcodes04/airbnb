//host
const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("addHome", { pageTitle: "Add Home to airbnb" });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render("homeAdded", { pageTitle: "Home Added Successfully" });
};

//user
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("home", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
    });
  });
};
