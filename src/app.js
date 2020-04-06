require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SERVER_PORT = 5002;

server.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/");
});

app.get("/javascript", (req, res) => {
  res.sendFile(process.cwd() + "/public/javascript.html");
});

app.get("/python", (req, res) => {
  res.sendFile(process.cwd() + "/public/python.html");
});

app.get("/switch", (req, res) => {
  res.sendFile(process.cwd() + "/public/switch.html");
});

const tech = io.of("tech");

tech.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `${data.username} joined!`);
  });

  socket.on("message", (data) => {
    tech.in(data.room).emit("message", data.msg);
  });

  io.on("disconnect", () => {
    console.log("User Disconected!");
    tech.emit("message", "User Disconected!");
  });
});
