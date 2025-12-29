const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// creating new destination
router.post("/", async (req, res) => {
  const destination = new Destination(req.body);
  await destination.save();
  res.json(destination);
});

// reading all data
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// updating destinations
router.put("/:id", async (req, res) => {
  const updated = await Destination.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Get a single destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// deleting destinations
router.delete("/:id", async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
