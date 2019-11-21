const mongoose = require('mongoose');

const collectionsSchema = new mongoose.Schema({
    name: String,
    user: String,
    songs: [String]
});

const Collections = mongoose.model('Collection', collectionsSchema);

module.exports = Collections;
