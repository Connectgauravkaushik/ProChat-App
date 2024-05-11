const express = require("express");
require("dotenv").config();
const connectDataBase = require("./config/db");
const authenticate = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

connectDataBase();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Gaurav Kaushik the api is working fine",
  });
});

app.use("/api/user", authenticate);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(8080, () => {
  console.log("We are Running on port no :  8080");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("A new use is connected with the ID : ", socket.id);

  socket.on("user-message", ({ roomId, data }) => {
    socket.to(roomId).emit("receive-message", data); // sending to the specific room id
    console.log(socket.id + "user message - ", data);
});

socket.on("typing", (room) => {
  socket.to(room).emit("typing");
});


socket.on("stop typing", (room) => {
  socket.to(room).emit("stop typing");
});

socket.on("join-room", (room) => {
  socket.join(room);
  console.log(`${room} user joined the room`)
});

});
