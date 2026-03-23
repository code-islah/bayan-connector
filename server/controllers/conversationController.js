import Conversation from "../models/Conversation.js";

export const createOrGetConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    // 🔍 check existing
    let conversation = await Conversation.findOne({
      members: { $all: [req.user.id, receiverId] },
    });

    // 🆕 create if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        members: [req.user.id, receiverId],
      });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
