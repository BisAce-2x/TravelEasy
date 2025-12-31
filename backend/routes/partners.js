const express = require("express");
const router = express.Router();
const Partner = require("../models/Partner");

router.post("/", async (req, res, next) => {
  try {
    const partner = await new Partner(req.body).save();
    res.status(201).json(partner);
  } catch (err) {
    next(err);
  }
});


router.get("/", async (req, res, next) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    next(err);
  }
});


router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      const error = new Error("Partner not found");
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
    const deleted = await Partner.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("Partner not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Partner deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
