const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const io = socketio(server);
var bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const passport = require("./server/passport/setup");
const auth = require("./server/routes/auth");

//const CreateCode = require("./server/controllers/CreateCode");
//onst VerifyCode = require("./server/controllers/VerifyCode");


const MONGO_URI = process.env.MONGO_URI;


mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "very secret this is",
    resave: false,
    saveUninitalized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI})
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);


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

app.get("/", (req, res) => {
    res.sendFile(__dirname, "public");
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
  