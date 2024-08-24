import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

const socket = io();

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("chat message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("chat history", (history: Message[]) => {
      setMessages(history);
    });

    socket.emit("get chat history");

    return () => {
      socket.off("chat message");
      socket.off("chat history");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage && username) {
      const newMessage: Message = {
        username,
        text: inputMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("chat message", newMessage);
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
      {!username ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUsername(inputMessage);
            setInputMessage("");
          }}
          className="mb-4"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="w-full p-2 bg-space-light bg-opacity-20 text-space-light rounded mb-2"
            placeholder="Enter your username..."
          />
          <button
            type="submit"
            className="w-full bg-space-accent text-space-dark px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
          >
            Set Username
          </button>
        </form>
      ) : (
        <>
          <div className="message-list h-64 overflow-y-auto mb-4 p-4 bg-space-dark bg-opacity-50 rounded">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className="message text-space-light mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold">{msg.username}: </span>
                {msg.text}
                <span className="text-xs text-space-accent ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
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
        </>
      )}
    </motion.div>
  );
};

export default ChatComponent;
