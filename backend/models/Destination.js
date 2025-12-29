const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  city: String,
  country: String,
  category: String,
  image: String,
});

module.exports = mongoose.model("Destination", destinationSchema);
