const mongoose = require("mongoose");

const payrollSchema =
  new mongoose.Schema({

    workerName: String,

    month: String,

    daysPresent: Number,

    overtimeDays: Number,

    dailyWage: Number,

    bonus: Number,

    totalSalary: Number

  });

module.exports = mongoose.model(
  "Payroll",
  payrollSchema
);