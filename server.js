const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on("connection", (socket) => {
    console.log("a user connected");
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
  