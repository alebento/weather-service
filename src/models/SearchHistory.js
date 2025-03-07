const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: String, required: true },
  weather: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
