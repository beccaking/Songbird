const express = require('express')
const router = express.Router()
const Songs = require('../models/songs.js')

const seedData = [{
  title: 'the light is coming',
  artist: 'Ariana Grande ft. Nicki Minaj',
  url: 'https://www.youtube.com/embed/OQitfe8u7i4'
},
{
  title:'breathin',
  artist:'Ariana Grande',
  url:'https://www.youtube.com/embed/kN0iD0pI3o0'
},
{
  title: 'Over Everything',
  artist: 'Courtney Barnett & Kurt Vile',
  url: 'https://www.youtube.com/embed/3KNsBCf34fQ'
},
{
  title: 'History Eraser',
  artist: 'Courtney Barnett',
  url: 'https://www.youtube.com/embed/k6_G5PlEXdk'
},
{
  title: 'How to Boil an Egg',
  artist: 'Courtney Barnett',
  url: 'https://www.youtube.com/embed/fA3PKsMOffU'
}]

//populates the index page with all the songs in the database
router.get('/', (req, res) => {
  Songs.find({}, (error, foundSongs) => {
      res.json(foundSongs)
    })
})

//finds a specific song by ID and returns it
router.get('/:id', (req, res) => {
  Songs.findById(req.params.id, (error, foundSong) => {
    res.json(foundSong)
  })
})

//drops the existing collection and replaces it with seed data
router.get('/seed', (req, res) => {
  Songs.remove({}, (error, deletedData) => {
    Songs.create(seedData, (error, createdSong) => {
      res.json(createdSong)
    })
  })
})

//adds a new song to the songs database
router.post('/', (req, res) => {
  Songs.create(req.body, (error, createdSong) => {
    res.json(createdSong)
  })
})

//edits a song in the songs database
router.put('/:id', (req, res) => {
  Songs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedSong) => {
    res.json(updatedSong)
  })
})

//deletes a song from the songs database
router.delete('/:id', (req, res) => {
  Songs.findByIdAndRemove(req.params.id, (errror, deletedSong) => {
    res.json(deletedSong)
  })
})

module.exports = router
