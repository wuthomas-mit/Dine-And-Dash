const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  Country: String,
  twoCode: String,
  Lat: String,
  Long: String,
  Adjacent: [],
});

module.exports = mongoose.model("Country", countrySchema, "Countries");
