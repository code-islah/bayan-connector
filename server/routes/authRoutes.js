import express from "express";
import { body } from "express-validator";
import {
  reg,
  login,
  getMe,
  admin,
  getUserById,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getSentRequests,
  getReceivedRequests,
  getFriends,
  unfriend,
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
router.post("/reg", upload.single("profileImage"), validateReg, reg);
router.post("/login", validateLogin, login);
router.get("/admin", protect, admin);

router.get("/friends", protect, getFriends);
router.post("/:id/request", protect, sendRequest);

router.get("/sendReqs", protect, getSentRequests);
router.get("/receivedReqs", protect, getReceivedRequests);

router.put("/:id/unfriend", protect, unfriend);

router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);
router.get("/:id", getUserById);

export default router;
