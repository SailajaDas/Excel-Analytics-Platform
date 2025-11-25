import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["success", "error", "info"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  action: String,
  fileName: String,
});

const History = mongoose.model("History", historySchema);
export default History;
