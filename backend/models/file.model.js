import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  rowCount: Number,
  columns: [String],
  data: [Object],
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);
export default File;
