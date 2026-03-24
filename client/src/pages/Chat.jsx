import { useEffect, useState, useRef } from "react";
import {useLocation} from "react-router-dom";
import axios from "../API/axios";
import { socket } from "../API/socket";
import useTitle from '../hooks/useTitle';

const Chat = () => {

  const location = useLocation();
  const {user, receiver} = location.state || {};
  useTitle(receiver ? receiver : "Chat");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  
  const scrollRef = useRef();

  //  CONNECT SOCKET
  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user]);

  // CREATE / GET CONVERSATION
  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.post(
        "/conversations",
        { receiverId: receiver._id }
      );

      setConversationId(res.data._id);
    };

    if (receiver?._id) getConversation();
  }, [receiver]);

  // 📥 LOAD MESSAGES
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const res = await axios.get(`/messages/${conversationId}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [conversationId]);

  // 📩 RECEIVE MESSAGE
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // 📤 SEND MESSAGE
  const handleSend = () => {
  
    if (!text || !conversationId) return;

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiver._id,
      conversationId,
      text
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: user._id,
        text
      }
    ]);

    setText("");
  };

  // 📜 SCROLL
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full mt-18">

      {/* HEADER */}
      <div className="p-3 border-b border-b-[#f5f0ee] flex items-center gap-4 shadow">
        <img
          src={receiver?.profileImage}
          className="w-10 h-10 aspect-square rounded-full object-cover outline-[#29B2B8] outline-3 outline-offset-2"
        />
        <p>{receiver?.name}</p>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-2">
        {messages.length !== 0 ? messages.map((m, i) => (
          <div
            key={i}
            ref={scrollRef}
            className={`p-2 my-1 max-w-xs rounded ${
              m.sender === user._id
                ? "bg-[#29B2B8] text-sec shadow ml-auto"
                : "bg-sec shadow"
            }`}
          >
            {m.text}
          </div>
        )) : <span className="text-sm text-thin text-center block pb-2 text-darkSub">Say Salam to your friend!</span>}
      </div>

      {/* INPUT */}
      <div className="flex p-2 gap-2">
        <input
          placeholder="Write your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded border border-[#29B2B8] p-2"
        />

        <button onClick={handleSend} className=" text-white px-4 rounded bg-[#29B2B8]">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;