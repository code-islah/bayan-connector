import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    if (!conversationId || !text) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text,
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
