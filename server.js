var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userDataSchema = require('./models/userSchema');


var userData = mongoose.model('userData',userDataSchema);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

http.listen(3000, function () {
    console.log("Listening on 3000");
});

/**
 * Socket IO connection
 */
io.on('connection', function (socket) {
    console.log('We have user connected !');

    socket.on('send', function (data) {
        console.log(data);
    });

    socket.emit('receive', 'hello from server');

    socket.on('search',function(text){
        const data = Math.random();
        io.emit('found',data + '--' + text);
    })

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

/**User details*/
app.get('/userdetails',function(req,res,err){
    var search = req.query.email;
    res.send({
        "payload":search
    })
})

/**
 * API to search
 */
app.get('/fetch',function(req,res){
    var regexText = req.query.search;
    userData.find({'email':new RegExp(regexText, "i")},function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send({result:result})
        }
    })
})

app.get('/join',function(req,res,err){
    var fname = req.query.fname;
    var lname = req.query.lname

    var name = {
        "fname":fname,
        "lname":lname
    }
    res.send({
        "full_name":name
    })
})
