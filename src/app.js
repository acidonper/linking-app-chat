require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SERVER_PORT = 5002;

app.get("/health", async (req, res) => {
  res.status(200).json({ message: "health OK!" });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});

const tech = io.of("tech");

tech.on("connection", (socket) => {
  console.log("new connection", socket.client.id);
  console.log("username: " + socket.handshake.query.username);

  socket.on("join", (data) => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `${data.username} joined!`);
  });

  socket.on("message", (data) => {
    tech.in(data.room).emit("message", data.msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconected!");
  });
});
