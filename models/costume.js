const mongoose = require("mongoose");

const costumeSchema = new mongoose.Schema({
  costume_type: String,
  size: String,
  cost: Number
});

module.exports = mongoose.model("Costume", costumeSchema);
