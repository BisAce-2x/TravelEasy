const express = require("express");
const router = express.Router();
const WhyChooseUs = require("../models/WhyChooseUs");

router.put("/:id", async (req, res) => {
  try {
    const updated = await WhyChooseUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const items = await WhyChooseUs.find();
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = new WhyChooseUs(req.body);
  await item.save();
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await WhyChooseUs.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
