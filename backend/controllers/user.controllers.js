import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.model.js";
import File from "../models/file.model.js";
import History from "../models/history.model.js";

import { sendOtpMail } from "../utils/mail.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error: ${error}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin) return res.status(404).json({ message: "User not found" });
    if (admin.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const users = await User.find().select("-password");

    const usersWithDetails = await Promise.all(
      users.map(async (u) => {
        const files = await File.find({ userId: u._id }).select(
          "name createdAt"
        );

        const activities = await History.find({ userId: u._id })
          .sort({ createdAt: -1 })
          .limit(5)
          .select("message action fileName createdAt type");

        return {
          ...u.toObject(),
          uploadedFiles: files.length,
          files: files.map((f) => ({
            fileName: f.name,
            uploadedAt: f.createdAt,
          })),
          recentActivity: activities.map((a) => ({
            description: `${a.action}: ${a.fileName || ""} (${a.type})`,
            date: a.createdAt,
          })),
        };
      })
    );

    return res.status(200).json(usersWithDetails);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: `Error fetching users: ${error}` });
  }
};
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = status.toLowerCase();
    await user.save();

    return res
      .status(200)
      .json({ message: "Status updated", status: user.status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error updating status: ${error}` });
  }
};

export const adminResetPassword = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate temporary 8-character password
    const tempPassword = crypto.randomBytes(4).toString("hex");

    // Hash and save password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Send temporary password to user's email
    await sendOtpMail(
      email,
      `Hello ${user.fullName},\n\nYour password has been reset by the admin. Your temporary password is:\n\n${tempPassword}\n\nPlease log in and change your password immediately.`
    );

    return res.status(200).json({
      message: `Password reset successfully. Temporary password sent to ${email}.`,
      tempPassword,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Admin reset password error: ${error}` });
  }
};
