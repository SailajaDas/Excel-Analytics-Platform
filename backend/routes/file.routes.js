import express from "express";
import File from "../models/file.model.js";
import History from "../models/history.model.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();
router.use(isAuth);

// Upload file
router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, rowCount, columns, data } = req.body;

    const file = new File({ userId, name, rowCount, columns, data });
    await file.save();

    await new History({
      userId,
      type: "success",
      message: `File uploaded: ${name}`,
      action: "File Uploaded",
      fileName: name,
    }).save();

    res.json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all files of logged-in user
router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const files = await File.find({ userId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a file
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ error: "File not found" });
    if (!file.userId.equals(userId))
      return res.status(403).json({ error: "Not authorized" });

    await File.findByIdAndDelete(req.params.id);

    await new History({
      userId,
      type: "error",
      message: `File deleted: ${file.name}`,
      action: "File Deleted",
      fileName: file.name,
    }).save();

    return res.json({ message: "File deleted successfully", id: file._id });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;



