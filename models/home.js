const registeredHomes = [];
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    registeredHomes.push(this);
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
      if (err) {
        console.log("Error writing home data to file:", err);
      } else {
        console.log("Home data saved successfully.");
      }
    });
  }

  static fetchAll() {
    return registeredHomes;
  }
};
