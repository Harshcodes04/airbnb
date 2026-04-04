const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: String,
  description: String,
});

//prehook -- if admin removed the home then it should be removed from favourites as well
// homeSchema.pre("findOneAndDelete", async function () {
//   const homeId = this.getQuery()._id;
//   await Favourite.deleteMany({ houseId: homeId });
// });

module.exports = mongoose.model("Home", homeSchema);
