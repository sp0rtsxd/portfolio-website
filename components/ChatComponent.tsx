import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";

const socket = io();

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit("chat message", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <motion.div
      className="chat-container bg-space-light bg-opacity-10 p-6 rounded-lg"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-list h-64 overflow-y-auto mb-4 p-4 bg-space-dark bg-opacity-50 rounded">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className="message text-space-light mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg}
          </motion.div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="message-input flex-grow mr-2 p-2 bg-space-light bg-opacity-20 text-space-light rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="send-button bg-space-accent text-space-dark px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
};

export default ChatComponent;
