import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register); // POST /api/auth/register
router.post("/login", login);       // POST /api/auth/login

// Protected routes
router.get("/me", authMiddleware, getMe); // GET /api/auth/me

export default router;