var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router);

http.listen(3000, function () {
    console.log("Listening on 3000");
});

io.on('connection', function (socket) {
    console.log('We have user connected !');
    socket.on('send', function (data) {
        console.log(data);
    });

    socket.emit('receive', 'hello from server');
    
});

/**API to post data */
app.post("/send", function (req, res) {
    var message = req.query.message;
    var data = {
        "message": message
    }
    io.on('connection', function (socket) {
        console.log('We have user connected !');
        socket.emit('getMessage', data);
        res.send(data);
    });
})