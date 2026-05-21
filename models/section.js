const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: String,
  cropType: String,
  areaSize: String,
  status: String,
  supervisor: String
});

module.exports = mongoose.model(
  "Section",
  sectionSchema
);