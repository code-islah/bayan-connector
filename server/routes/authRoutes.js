import express from "express";
import { body } from "express-validator";
import {
  reg,
  login,
  getMe,
  admin,
  getUserById,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const validateReg = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").exists().withMessage("Password is required"),
];

router.get("/me", protect, getMe);
router.get("/:id", getUserById);
router.post("/reg", upload.single("profileImage"), validateReg, reg);
router.post("/login", validateLogin, login);
router.get("/admin", protect, admin);

export default router;
