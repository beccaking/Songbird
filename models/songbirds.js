const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songbirdSchema = new Schema({
    username:String,
    password:String
});

const Songbird = mongoose.model('Songbird', songbirdSchema);

module.exports = Songbird;
