const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

// GET workers
router.get("/", async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

// POST worker
router.post("/", async (req, res) => {
  const newWorker = new Worker(req.body);
  await newWorker.save();
  res.json(newWorker);
});

module.exports = router;