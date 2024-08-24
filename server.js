const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const chatHistory = [];

nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msg) => {
      console.log("Message received:", msg);
      chatHistory.push(msg);
      if (chatHistory.length > 100) {
        chatHistory.shift();
      }
      io.emit("chat message", msg);
    });

    socket.on("get chat history", () => {
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      const recentHistory = chatHistory.filter(
        (msg) => new Date(msg.timestamp) > twelveHoursAgo
      );
      socket.emit("chat history", recentHistory);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  app.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
