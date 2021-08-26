const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
//we are creating a new collection
const History = new mongoose.model("history", historySchema);

module.exports = History;
