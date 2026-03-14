const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  //Writting the home data to the db
  save() {
    const db = getDB();
    if (this._id) {
      //update
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields },
        );
    } else {
      //insert
      return db.collection("homes").insertOne(this);
    }
  }

  //Reading the file content so even if we restart the server we can get the previously added homes

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    try {
      return db
        .collection("homes")
        .findOne({ _id: new ObjectId(String(homeId)) });
    } catch (error) {
       console.log("Error converting to ObjectId", homeId);
       return Promise.resolve(null);
    }
  }

  static removeHostHome(homeId) {
    const db = getDB();
    try {
      return db
        .collection("homes")
        .deleteOne({ _id: new ObjectId(String(homeId)) });
    } catch (error) {
      console.log("Error converting to ObjectId", homeId);
      return Promise.resolve(null);
    }
  }
};
