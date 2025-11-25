import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
    resetOtp: { type: String },
    isOtpVerified: { type: Boolean, default: false },
    otpExpires: { type: Date },
    lastLogin: { type: Date },
    uploadedFiles: { type: Number, default: 0 },
    avatar: { type: String },

    recentActivity: [
      {
        description:  { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

