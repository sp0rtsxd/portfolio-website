const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const onlineUsers = new Map();
const chatHistory = [];

const HISTORY_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

function addMessageToHistory(message) {
  const now = Date.now();
  chatHistory.push(message);

  if (message.parentId) {
    const parentMessage = chatHistory.find(
      (msg) => msg.id === message.parentId
    );
    if (parentMessage) {
      parentMessage.replies.push(message.id);
    }
  }

  // Remove messages older than 12 hours
  while (
    chatHistory.length > 0 &&
    now - chatHistory[0].timestamp > HISTORY_DURATION
  ) {
    chatHistory.shift();
  }
}

function addReactionToMessage(message, emoji, username) {
  if (!message.reactions[emoji]) {
    message.reactions[emoji] = [];
  }
  // Remove the user's previous reaction with this emoji if it exists
  const index = message.reactions[emoji].indexOf(username);
  if (index > -1) {
    message.reactions[emoji].splice(index, 1);
  }
  // Add the new reaction
  if (!message.reactions[emoji].includes(username)) {
    message.reactions[emoji].push(username);
  }
}

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", (user) => {
      onlineUsers.set(socket.id, user);
      io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));

      // Send chat history to the new user
      socket.emit("chatHistory", chatHistory);
    });

    socket.on("message", (message) => {
      addMessageToHistory(message);
      io.emit("message", message);

      if (message.parentId) {
        const parentMessage = chatHistory.find(
          (msg) => msg.id === message.parentId
        );
        if (parentMessage) {
          io.emit("updateMessage", parentMessage);
        }
      }
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("userTyping", username);
    });

    socket.on("reaction", ({ messageId, emoji, username }) => {
      const message = chatHistory.find((msg) => msg.id === messageId);
      if (message) {
        addReactionToMessage(message, emoji, username);
        io.emit("updateMessage", message);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
      console.log("A user disconnected");
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
