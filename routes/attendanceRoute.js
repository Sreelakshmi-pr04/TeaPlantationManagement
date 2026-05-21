const express = require("express");

const router = express.Router();

const Attendance =
  require("../models/attendance");

// =========================
// Get all attendance
// =========================
router.get("/", async (req, res) => {

  try {

    const attendance =
      await Attendance.find();

    res.json(attendance);

  } catch (error) {

    console.log(
      "GET attendance error:",
      error
    );

    res.status(500).json({
      error: "Error fetching attendance"
    });
  }
});

// =========================
// Add attendance
// =========================
router.post("/", async (req, res) => {

  try {

    const newAttendance =
      new Attendance(req.body);

    await newAttendance.save();

    res.json(newAttendance);

  } catch (error) {

    console.log(
      "POST attendance error:",
      error
    );

    res.status(500).json({
      error: "Error adding attendance"
    });
  }
});

// =========================
// Delete attendance
// =========================
router.delete("/:id", async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Attendance deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE attendance error:",
      error
    );

    res.status(500).json({
      error:
        "Error deleting attendance"
    });
  }
});

// =========================
// Update attendance
// =========================
router.put("/:id", async (req, res) => {

  try {

    const updatedAttendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedAttendance);

  } catch (error) {

    console.log(
      "PUT attendance error:",
      error
    );

    res.status(500).json({
      error:
        "Error updating attendance"
    });
  }
});

module.exports = router;