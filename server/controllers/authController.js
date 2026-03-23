import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { validationResult } from "express-validator";

// @desc    Register user
// @route   POST /api/auth/reg
// @access  Public
export const reg = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, birthDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "users",
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      birthDate,
      profileImage: result.secure_url,
      profileImageId: result.public_id,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current user
// @route   GET /api/auth/admin
// @access  Private
export const admin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// get User By ID

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// send request

   export const sendRequest = async (req, res) => {
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(req.params.id);

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!sender || !receiver) {
      return res.status(400).json({ message: "Invalid users" });
    }

    if (sender._id.toString() === receiver._id.toString()) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    sender.friendRequests.sent.push(receiver._id);
    receiver.friendRequests.received.push(sender._id);

    await sender.save();
    await receiver.save();

    res.json({ success: true });

  } catch (err) {
    console.error(" ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


//  accept

    export const acceptRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const sender = await User.findById(req.params.id);

    // add to friends
    user.friends.push(sender._id);
    sender.friends.push(user._id);

    // remove from requests
    user.friendRequests.received =
      user.friendRequests.received.filter(
        id => id.toString() !== sender._id.toString()
      );

    sender.friendRequests.sent =
      sender.friendRequests.sent.filter(
        id => id.toString() !== user._id.toString()
      );

    await user.save();
    await sender.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//remove 

   export const rejectRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const sender = await User.findById(req.params.id);

    user.friendRequests.received =
      user.friendRequests.received.filter(
        id => id.toString() !== sender._id.toString()
      );

    sender.friendRequests.sent =
      sender.friendRequests.sent.filter(
        id => id.toString() !== user._id.toString()
      );

    await user.save();
    await sender.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// get getSentRequests

export const getSentRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friendRequests.sent", "name email profileImage");

    res.json({
      success: true,
      sentRequests: user.friendRequests.sent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get who send reqs

  export const getReceivedRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friendRequests.received", "name email profileImage");

    res.json({
      success: true,
      receivedRequests: user.friendRequests.received,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// get all friends

   export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friends", "name email profileImage");

    res.json({
      success: true,
      friends: user.friends,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// unfriend

  
   export const unfriend = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.params.id);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove friend from both users
    user.friends = user.friends.filter(
      id => id.toString() !== friend._id.toString()
    );

    friend.friends = friend.friends.filter(
      id => id.toString() !== user._id.toString()
    );

    await user.save();
    await friend.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};












