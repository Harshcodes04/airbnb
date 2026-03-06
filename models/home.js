const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  //Writting the home data to a json file in the data folder so that we can persist the data even if we restart the server
  save() {
    if (this.id) {
      //update the existing home if id is present
      return db.execute(
        `UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ],
      );
    } else {
      return db.execute(
        `INSERT INTO homes(houseName, price, location, rating, photoUrl, description) VALUES(?, ?, ?, ?, ?, ?)`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ],
      );
    }
  }

  //Reading the file content so even if we restart the server we can get the previously added homes

  static fetchAll() {
    return db.execute("SELECT * FROM homes ");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static removeHostHome(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
