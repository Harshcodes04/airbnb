const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
