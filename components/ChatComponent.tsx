import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  avatar: string;
  reactions: { [key: string]: string[] };
  parentId?: string;
  replies: string[];
}

interface User {
  name: string;
  avatar: string;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const socketRef = useRef<any>();
  const lastTypingTime = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on("message", (message: Message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socketRef.current.on("updateOnlineUsers", (users: User[]) => {
      setOnlineUsers(users);
    });

    socketRef.current.on("userTyping", (username: string) => {
      setTypingUsers((users) => [...new Set([...users, username])]);
      setTimeout(() => {
        setTypingUsers((users) => users.filter((u) => u !== username));
      }, 3000);
    });

    socketRef.current.on("updateMessage", (updatedMessage: Message) => {
      setMessages((msgs) =>
        msgs.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    });

    socketRef.current.on("chatHistory", (history: Message[]) => {
      setMessages(history);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && user) {
      const message: Message = {
        id: Date.now().toString(),
        user: user.name,
        text: input,
        timestamp: Date.now(),
        avatar: user.avatar,
        reactions: {},
        replies: [],
        parentId: replyingTo || undefined, // Use undefined if replyingTo is null
      };
      socketRef.current.emit("message", message);
      setInput("");
      setReplyingTo(null);
    }
  };

  const joinChat = () => {
    if (input) {
      const avatar = `https://avatar.oxro.io/avatar.svg?name=${input}&background=${
        COLORS[Math.floor(Math.random() * COLORS.length)]
      }&length=1`;
      const newUser = { name: input, avatar };
      setUser(newUser);
      socketRef.current.emit("joinChat", newUser);
      setInput("");
    }
  };

  const handleTyping = () => {
    if (!user) return;
    const now = Date.now();
    if (now - lastTypingTime.current > 1000) {
      socketRef.current.emit("typing", user.name);
      lastTypingTime.current = now;
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    if (!user) return;
    socketRef.current.emit("reaction", {
      messageId,
      emoji,
      username: user.name,
    });
  };

  const renderMessage = (msg: Message, isReply = false) => (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-2 flex ${
        msg.user === user?.name ? "justify-end" : "justify-start"
      } ${isReply ? "ml-8" : ""}`}
    >
      <div
        className={`flex ${
          msg.user === user?.name ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <img
          src={msg.avatar}
          alt={msg.user}
          className="w-8 h-8 rounded-full mx-2"
        />
        <div>
          <p
            className={`${
              msg.user === user?.name ? "text-space-pink" : "text-space-white"
            }`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </p>
          <span className="text-xs text-gray-500">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
          <div className="flex mt-1">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addReaction(msg.id, emoji)}
                className={`mr-2 rounded-full px-2 py-1 text-xs ${
                  msg.reactions[emoji]?.includes(user?.name || "")
                    ? "bg-space-purple"
                    : "bg-space-blue"
                } hover:bg-space-pink transition-colors`}
              >
                {emoji} {msg.reactions[emoji]?.length || 0}
              </button>
            ))}
            <button
              onClick={() => setReplyingTo(msg.id)}
              className="text-space-white text-xs hover:text-space-pink transition-colors"
            >
              Reply
            </button>
          </div>
          {msg.replies.map((replyId) => {
            const replyMsg = messages.find((m) => m.id === replyId);
            return replyMsg ? renderMessage(replyMsg, true) : null;
          })}
        </div>
      </div>
    </motion.div>
  );

  if (!user) {
    return (
      <div className="bg-space-blue p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Enter your name to join the chat
        </h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 mb-4 bg-space-black text-space-white rounded"
          placeholder="Your name"
        />
        <button
          onClick={joinChat}
          className="bg-space-purple hover:bg-space-pink text-space-white font-bold py-2 px-4 rounded transition-colors"
        >
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div className="bg-space-blue p-6 rounded-lg flex">
      <div className="w-3/4 pr-4">
        <div className="h-96 overflow-y-auto mb-4 p-4 bg-space-black rounded">
          {messages
            .filter((msg) => !msg.parentId)
            .map((msg) => renderMessage(msg))}
          <div ref={messagesEndRef} />
        </div>
        {typingUsers.length > 0 && (
          <div className="text-space-white text-sm mb-2">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"}{" "}
            typing...
          </div>
        )}
        {replyingTo && (
          <div className="text-space-white text-sm mb-2">
            Replying to:{" "}
            {messages
              .find((msg) => msg.id === replyingTo)
              ?.text.substring(0, 20)}
            ...
            <button
              onClick={() => setReplyingTo(null)}
              className="ml-2 text-space-pink"
            >
              Cancel
            </button>
          </div>
        )}
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleTyping}
            className="flex-grow p-2 mr-2 bg-space-black text-space-white rounded"
            placeholder={
              replyingTo ? "Type your reply..." : "Type a message..."
            }
          />
          <button
            type="submit"
            className="bg-space-purple hover:bg-space-pink text-space-white font-bold py-2 px-4 rounded transition-colors"
          >
            Send
          </button>
        </form>
      </div>
      <div className="w-1/4 bg-space-black p-4 rounded">
        <h3 className="text-xl font-bold mb-4">Online Users</h3>
        <ul>
          {onlineUsers.map((onlineUser, index) => (
            <li key={index} className="mb-2 flex items-center">
              <img
                src={onlineUser.avatar}
                alt={onlineUser.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              {onlineUser.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatComponent;
