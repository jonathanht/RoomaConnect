const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers,
    getRoomUsers,
    getAllJson,
  } = require('./utils/users');

const users = [];


io.on("connection", (socket) => {
    socket.on("joinRoom", (jsonResult) => {
        var obj = JSON.parse(jsonResult);
        const user = userJoin(socket.id, obj.name, obj);

        //io.emit("joinRoom", getAllUsers());
        io.emit("joinRoom", getAllJson());
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        io.emit("joinRoom", getAllJson());
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
  