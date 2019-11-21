const mongoose = require('mongoose');

const collectionsSchema = new mongoose.Schema({
    user: String,
    songs: []
});

const Collections = mongoose.model('Collection', collectionsSchema);

module.exports = Collections;
