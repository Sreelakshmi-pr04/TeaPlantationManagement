const express = require("express");

const router = express.Router();

const Payroll =
  require("../models/payroll");

// =========================
// Get all payroll records
// =========================
router.get("/", async (req, res) => {

  try {

    const payroll =
      await Payroll.find();

    res.json(payroll);

  } catch (error) {

    console.log(
      "GET payroll error:",
      error
    );

    res.status(500).json({
      error:
        "Error fetching payroll"
    });
  }
});

// =========================
// Add payroll
// =========================
router.post("/", async (req, res) => {

  try {

    const newPayroll =
      new Payroll(req.body);

    await newPayroll.save();

    res.json(newPayroll);

  } catch (error) {

    console.log(
      "POST payroll error:",
      error
    );

    res.status(500).json({
      error:
        "Error adding payroll"
    });
  }
});

// =========================
// Delete payroll
// =========================
router.delete("/:id", async (req, res) => {

  try {

    await Payroll.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Payroll deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE payroll error:",
      error
    );

    res.status(500).json({
      error:
        "Error deleting payroll"
    });
  }
});

// =========================
// Update payroll
// =========================
router.put("/:id", async (req, res) => {

  try {

    const updatedPayroll =
      await Payroll.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedPayroll);

  } catch (error) {

    console.log(
      "PUT payroll error:",
      error
    );

    res.status(500).json({
      error:
        "Error updating payroll"
    });
  }
});

module.exports = router;