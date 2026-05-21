const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  workerName: String,

  date: String,

  attendanceStatus: String,

  assignedSection: String,

  task: String,

  quantityCollected: Number

});

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);