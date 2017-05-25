var mongoose = require('mongoose');

const MONGO_DBNAME = "test";
const MONGO_URL = "mongodb://localhost:27017/" + MONGO_DBNAME;

mongoose.connect(MONGO_URL);


var userDataSchema = new mongoose.Schema({
    name:String,
    email:String
}, { collection: 'user_email' });

module.exports = userDataSchema;   