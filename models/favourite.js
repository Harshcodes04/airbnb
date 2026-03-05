const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { register } = require("module");
const favouriteDataPath = path.join(rootDir, "data", "favourites.json");
module.exports = class Favourite {
  //Writting the favourite data to a json file in the data folder so that we can persist the data even if we restart the server

  static addToFavourites(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        console.log("Home is already in favourites.");
        callback(null);
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err || !data || data.length === 0) {
        return callback([]);
      }
      try {
        callback(JSON.parse(data));
      } catch (e) {
        callback([]);
      }
    });
  }

  static removeFavourites(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      const updatedFavourites = favourites.filter((id) => id !== homeId);
      if (updatedFavourites.length === favourites.length) {
        console.log("Home was not in favourites.");
        callback(null);
      } else {
        fs.writeFile(
          favouriteDataPath,
          JSON.stringify(updatedFavourites),
          callback,
        );
      }
    });
  }
};
