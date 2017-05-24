var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const MONGO_URL = "mongodb://localhost:27017/user_email";

var db = mongoose.connect(MONGO_URL);

var userSchema = mongoose.model('user_email',{
    name:String,
    email:String
});



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

    socket.on('search',function(text){
        const data = Math.random();
        io.emit('found',text);
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

app.get('/userdetails',function(req,res,err){
    var search = req.query.email;
    res.send({
        "payload":search
    })
})

app.get('/fetch',function(req,res){
  
    userSchema.find({'email':{$regex:/k/}},function(err,result){
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