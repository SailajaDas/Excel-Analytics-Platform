import express from "express";
import {
  adminResetPassword,
  getAllUsers,
  getCurrentUser,
  updateUserStatus,
} from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/all-users", isAuth, getAllUsers);
router.patch("/:id/status", isAuth, updateUserStatus);
router.post("/admin-reset-password", isAuth, adminResetPassword);

export default router;
