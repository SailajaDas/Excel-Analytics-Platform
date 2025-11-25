import User from "../models/user.model.js";

export const uploadFile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Assuming file is uploaded successfully here
    user.uploadedFiles = (user.uploadedFiles || 0) + 1;

    // Add to recent activity
    user.recentActivity = user.recentActivity || [];
    user.recentActivity.push({
      description: `Uploaded file: ${req.file.originalname || "file"}`,
      date: new Date(),
    });

    await user.save();
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    return res.status(500).json(`Upload error: ${error}`);
  }
};

