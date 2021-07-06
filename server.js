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
    getRoomUsers
  } = require('./utils/users');

const users = [];


io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("joinRoom", (jsonResult) => {
        var obj = JSON.parse(jsonResult);
        const user = userJoin(socket.id, obj.name);
        //socket.jsonResult = jsonResult;
        //users.push(jsonResult);
        io.emit("joinRoom", getAllUsers());
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        io.emit("joinRoom", getAllUsers());
    });

        

});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
  