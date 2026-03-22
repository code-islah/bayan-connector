import Post from "../models/Post.js";
import cloudinary from "../config/cloudinaryConfig.js";

//  POST api/posts
export const createPost = async (req, res) => {
  try {
    const { content, county, emoji } = req.body;

    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
      imgUrl = result.secure_url;
    }

    const post = await Post.create({
      user: req.user.id,
      content,
      county,
      emoji,
      image: imgUrl,
    });

    res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profileImage")
      .populate("comments.user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// like
export const likePost = async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.id);
    const existing = post.likes.find((li) => {
      return li.user.toString() === req.user.id;
    });

    if (existing) {
      existing.emoji = emoji;
    } else {
      post.likes.push({
        user: req.user.id,
        emoji,
      });
    }

    await post.save();
    res.json({ success: true, likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//comment
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }

    post.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await post.save();

    await post.populate("comments.user", "name profileImage");

    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get Posts by ID

export const getPostsById = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
