var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();

app.use('/', router);

http.listen(3000, function () {
    console.log("Listening on 3000");
});

io.on('connection', function (socket) {
    console.log('We have user connected !');
    // This event will be emitted from Client when some one add comments.
    socket.on('send message', function (error, result) {
        if (error) { io.emit('error') }
        else {
            socket.broadcast.emit('notify everyone', { msg: data.message })
        }

    });
});