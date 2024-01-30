const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  fastest: { type: Number, default: 0 },
  slowest: { type: Number, default: 0 },
  visited: { type: [String], default: [] },
  currentAvatar: { type: String, default: "agentRaccoon" },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
