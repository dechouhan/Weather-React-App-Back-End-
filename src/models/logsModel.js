const mongoose = require("mongoose");
const logsSchema = new mongoose.Schema({
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
});
//we are creating a new collection
const Logs = new mongoose.model("logs", logsSchema);

module.exports = Logs;
