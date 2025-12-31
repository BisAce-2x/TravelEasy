const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

router.post("/", async (req, res, next) => {
  try {
    const destination = await new Destination(req.body).save();
    res.status(201).json(destination);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      const error = new Error("Destination not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(destination);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      const error = new Error("Destination not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("Destination not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
