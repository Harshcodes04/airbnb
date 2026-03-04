const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const homeDataPath = path.join(rootDir, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  //Writting the home data to a json file in the data folder so that we can persist the data even if we restart the server
  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log("Error writing home data to file:", err);
        } else {
          console.log("Home data saved successfully.");
        }
      });
    });
  }

  //Reading the file content so even if we restart the server we can get the previously added homes

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      let registeredHomes = [];
      if (!err && data.length > 0) {
        try {
          registeredHomes = JSON.parse(data);
        } catch (err) {
          console.error("Error parsing home data:", err);
        }
      }
      callback(registeredHomes);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};
