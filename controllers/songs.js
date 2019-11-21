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
  url: 'https://www.youtube.com/embed/k6_G5PlEXdk'
}]

router.get('/', (req, res) => {
  Songs.find({}, (error, foundSongs) => {
      res.json(foundSongs)
    })
})

router.get('/seed', (req, res) => {
  Songs.create(seedData, (error, createdSong) => {
    res.json(createdSong)
  })
})

module.exports = router

//require controller in server.js
