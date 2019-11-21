const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title:,
  artist:,
  link:
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
