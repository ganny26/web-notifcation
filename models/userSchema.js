var mongoose = require('mongoose');

const MONGO_URL = "mongodb://localhost:27017/user_email";

var db = mongoose.connect(MONGO_URL);

var userSchema = mongoose.Schema('user_email',{
    name:String,
    email:String
});

var userDetails = db.model('user_email',userSchema);

module.exports = userDetails;   