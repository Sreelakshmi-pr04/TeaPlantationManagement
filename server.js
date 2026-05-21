const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

// =========================
// Routes
// =========================
const authRoutes =
  require("./routes/authRoute");

const sectionRoutes =
  require("./routes/sectionRoute");

const attendanceRoutes =
  require("./routes/attendanceRoute");

  const payrollRoutes =
  require("./routes/payrollRoute");
// =========================
// Middleware
// =========================
app.use(express.json());

app.use(cors());

// =========================
// Route Middleware
// =========================
app.use("/", authRoutes);

app.use("/sections", sectionRoutes);

app.use(
  "/attendance",
  attendanceRoutes
);

app.use("/payroll", payrollRoutes);

// =========================
// MongoDB Connection
// =========================
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.qqd7ddq.mongodb.net/teaDB?retryWrites=true&w=majority"
)
  .then(() =>
    console.log("MongoDB connected")
  )
  .catch(err =>
    console.log(
      "MongoDB connection error:",
      err
    )
  );

// =========================
// Worker Model
// =========================
const workerSchema = new mongoose.Schema({
  name: String,
  role: String,
  wage: Number,
  workerType: String
});

const Worker = mongoose.model(
  "Worker",
  workerSchema
);

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {

  res.send(
    "Tea Plantation Backend Running 🚀"
  );
});

// =========================
// Worker Routes
// =========================

// Get all workers
app.get("/workers", async (req, res) => {

  try {

    const workers =
      await Worker.find();

    res.json(workers);

  } catch (error) {

    console.log(
      "GET /workers error:",
      error
    );

    res.status(500).json({
      error: "Error fetching workers"
    });
  }
});

// Add worker
app.post("/workers", async (req, res) => {

  try {

    const newWorker =
      new Worker(req.body);

    await newWorker.save();

    res.json(newWorker);

  } catch (error) {

    console.log(
      "POST /workers error:",
      error
    );

    res.status(500).json({
      error: "Error adding worker"
    });
  }
});

// Delete worker
app.delete(
  "/workers/:id",
  async (req, res) => {

    try {

      await Worker.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Worker deleted successfully"
      });

    } catch (error) {

      console.log(
        "DELETE /workers error:",
        error
      );

      res.status(500).json({
        error:
          "Error deleting worker"
      });
    }
  }
);

// Update worker
app.put(
  "/workers/:id",
  async (req, res) => {

    try {

      const updatedWorker =
        await Worker.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedWorker);

    } catch (error) {

      console.log(
        "PUT /workers error:",
        error
      );

      res.status(500).json({
        error:
          "Error updating worker"
      });
    }
  }
);

// =========================
// Server
// =========================
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});