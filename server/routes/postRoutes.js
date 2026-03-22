import express from "express";
import {
  createPost,
  getPosts,
  addComment,
  likePost,
  getPostsById,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/user/:id", getPostsById);
router.post("/", protect, upload.single("image"), createPost);
router.get("/", getPosts);
router.post("/:id/comment", protect, addComment);
router.put("/:id/like", protect, likePost);

export default router;
