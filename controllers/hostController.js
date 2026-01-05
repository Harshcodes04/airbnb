const Home = require("../models/homes");
const registeredHomes = [];

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Add Home",
    currentPage: "add-home",
  });
};

exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
    });
  });
};
exports.postAddHome = (req, res, next) => {
  console.log(req.method, req.url, req.body);
  const { houseName, price, address, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, address, rating, photoUrl);
  home.save();
  registeredHomes.push({
    houseName: req.body.houseName,
    address: req.body.address,
    price: req.body.price,
    rating: req.body.rating,
    photoUrl: req.body.photoUrl,
  });
  res.render("host/sHome", { pageTitle: "Home added successfully" });
};
