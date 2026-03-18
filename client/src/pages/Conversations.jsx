// Conversation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "react-feather";
import "./Conversations.css";

const Conversation = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how are you?", sender: "other" },
    { id: 2, text: "I am good, thanks!", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "me" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="mt-14 conversation-container">
      <div className="conversation-header">
        <Link to="/profile">Profile</Link>
        <h2>John Doe</h2>
      </div>
      <div className="conversation-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="conversation-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">
          <Send color="#1C7898" size={20} />
        </button>
      </form>
    </div>
  );
};

export default Conversation;
