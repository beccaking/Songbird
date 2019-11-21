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

router.get('/', (req, res) => {
  Songs.find({}, (error, foundSongs) => {
      res.json(foundSongs)
    })
})

router.get('/seed', (req, res) => {
  Songs.remove({}, (error, deletedData) => {
    Songs.create(seedData, (error, createdSong) => {
      res.json(createdSong)
    })
  })
})

router.post('/', (req, res) => {
  Songs.create(req.body, (error, createdSong) => {
    res.json(createdSong)
  })
})

router.put('/:id', (req, res) => {
  Songs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedSong) => {
    res.json(updatedSong)
  })
})

router.delete('/:id', (req, res) => {
  Songs.findByIdAndRemove(req.params.id, (errror, deletedSong) => {
    res.json(deletedSong)
  })
})

module.exports = router
