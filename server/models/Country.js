const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  twoCode: String,
  Lat: String,
  Long: String,
});

module.exports = mongoose.model("Country", countrySchema, "Countries");
