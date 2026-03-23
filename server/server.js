import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js"; 
import Message from "./models/Message.js";
dotenv.config({ path: "../.env" });
import connectDB from "./config/db.js";
import {Server} from "socket.io";

const app = express();
const PORT = 3434;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages",messageRoutes);
app.get("/", (req, res) => {
  res.send("Bayan Connector API");
});

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});


const io = new Server(server,{
 cors: {
  origin: "*" 
 }
});




   let users = {};

const addUser = (userId, socketId) => {
  users[userId] = socketId;
};

const getUser = (userId) => users[userId];

io.on("connection", (socket) => {

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    // send online users
    io.emit("getUsers", Object.keys(users));
  });

  // 🔥 SEND MESSAGE
  socket.on("sendMessage", async (data) => {

    const message = await Message.create({
      conversationId: data.conversationId,
      sender: data.senderId,
      text: data.text
    });

    const receiver = getUser(data.receiverId);

    if (receiver) {
      io.to(receiver).emit("receiveMessage", message);
    }
  });

  // ✍️ typing
  socket.on("typing", ({ receiverId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver).emit("typing");
    }
  });

  socket.on("stopTyping", ({ receiverId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver).emit("stopTyping");
    }
  });

  // ✔ seen
  socket.on("seenMessage", async ({ conversationId, senderId }) => {
    await Message.updateMany(
      { conversationId, sender: senderId, seen: false },
      { seen: true }
    );
  });

});



