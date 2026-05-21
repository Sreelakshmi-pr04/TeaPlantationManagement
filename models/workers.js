const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  role: String,
  wage: Number,
 workerType: String
});

module.exports = mongoose.model("Worker", workerSchema);