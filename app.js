const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("'/' path requested");
  res.sendFile(__dirname + "/index.html");
});

let text = "";

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("to_client", text);

  socket.on("from_client", (msg) => {
    text = msg;
    socket.broadcast.emit("to_client", text);
    // console.log("message: " + text);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
