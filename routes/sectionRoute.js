const express = require("express");

const router = express.Router();

const Section = require("../models/section");

// =========================
// Get all sections
// =========================
router.get("/", async (req, res) => {

  try {

    const sections = await Section.find();

    res.json(sections);

  } catch (error) {

    console.log("GET sections error:", error);

    res.status(500).json({
      error: "Error fetching sections"
    });
  }
});

// =========================
// Add section
// =========================
router.post("/", async (req, res) => {

  try {

    const newSection = new Section(req.body);

    await newSection.save();

    res.json(newSection);

  } catch (error) {

    console.log("POST section error:", error);

    res.status(500).json({
      error: "Error adding section"
    });
  }
});

// =========================
// Delete section
// =========================
router.delete("/:id", async (req, res) => {

  try {

    await Section.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Section deleted successfully"
    });

  } catch (error) {

    console.log("DELETE section error:", error);

    res.status(500).json({
      error: "Error deleting section"
    });
  }
});

// =========================
// Update section
// =========================
router.put("/:id", async (req, res) => {

  try {

    const updatedSection =
      await Section.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedSection);

  } catch (error) {

    console.log("PUT section error:", error);

    res.status(500).json({
      error: "Error updating section"
    });
  }
});

module.exports = router;