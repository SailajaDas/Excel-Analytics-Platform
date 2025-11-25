import express from "express";
import History from "../models/history.model.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();
router.use(isAuth);
router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await History.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching history", error: err.message });
  }
});

// Add history
router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, message, action, fileName } = req.body;

    if (!type || !message)
      return res.status(400).json({ message: "type and message are required" });

    const newHistory = new History({ userId, type, message, action, fileName });
    await newHistory.save();

    res.status(201).json(newHistory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving history", error: err.message });
  }
});

// Delete single history item
router.delete("/item/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const historyItem = await History.findById(req.params.id);

    if (!historyItem)
      return res.status(404).json({ message: "History item not found" });
    if (!historyItem.userId.equals(userId))
      return res.status(403).json({ message: "Not authorized" });

    await historyItem.remove();
    res.json({ message: "History record deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting history", error: err.message });
  }
});

// Clear all history for user
router.delete("/clear", async (req, res) => {
  try {
    const userId = req.user._id;
    await History.deleteMany({ userId });
    res.json({ message: "All history cleared for user" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error clearing history", error: err.message });
  }
});

export default router;



