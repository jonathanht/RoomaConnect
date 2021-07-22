const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = socketio(server);

const moment = require('moment');
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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
        const user = userJoin(socket.id, obj.name, obj, obj.room);

        socket.join(user.room);

        //io.emit("joinRoom", getAllUsers());
        io.to(user.room).emit("joinRoom", getAllJson(user.room));
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        io.to(user.room).emit("joinRoom", getAllJson(user.room));
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
  