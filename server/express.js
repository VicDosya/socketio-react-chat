//Import packages (ESM).
import express from "express";
import bodyParser from "body-parser";

//Variables
const app = express();
const PORT = 4000;

//Socket installation
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  //Listens and logs the message to the console
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  //Listen when user is typing
  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

//Server Start - notice the http.listen and not app.listen.
http.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
