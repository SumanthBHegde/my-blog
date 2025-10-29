import express from "express";

const router = express.Router();

//Routes
import {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationCode,
  userProfile,
  updateProfile,
  updateProfilePicture,
  deleteUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers.js";

//Middleware
import {
  adminGuard,
  authGuard,
  verifiedGuard,
} from "../middleware/authMiddleware.js";
import { verificationLimiter } from "../middleware/rateLimiter.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verificationLimiter, verifyEmail);
router.post(
  "/resend-verification",
  verificationLimiter,
  resendVerificationCode
);
router.post("/forgot-password", verificationLimiter, forgotPassword);
router.post("/reset-password", verificationLimiter, resetPassword);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile/:userId", authGuard, verifiedGuard, updateProfile);
router.put(
  "/updateProfilePicture",
  authGuard,
  verifiedGuard,
  updateProfilePicture
);
router.get("/", authGuard, adminGuard, getAllUsers);
router.delete("/:userId", authGuard, adminGuard, deleteUser);

export default router;
