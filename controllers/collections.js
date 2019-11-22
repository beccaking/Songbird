const express = require('express');
const router = express.Router();
const Collections = require('../models/collections.js')
const Songs = require('../models/songs.js')

//show all collections
router.get('/', (req, res) => {
  Collections.find({}, (error, foundCollections) => {
    res.json(foundCollections)
  })
});

//show users collections
router.get('/:userid', (req, res) => {
  Collections.find({user:req.params.userid}, (error, foundCollections) => {
    res.json(foundCollections);
    // console.log(foundCollections);
  })
})
//
// show the songs in a collection -- doesn't work yet
router.get('/songs/:collectionid', (req, res) => {
  let songs = []
  Collections.findById(req.params.collectionid, (error, foundCollection) => {
    // console.log(foundCollection.songs);
    res.json(foundCollection.songs)
  })
})

//create a new collection
router.post('/', (req, res) => {
  Collections.create(req.body, (error, createdCollection) => {
    res.json(createdCollection)
  })
})

// delete a collection
router.delete('/:id', (req, res) => {
  Collections.findByIdAndRemove(req.params.id, (error, deletedCollection) => {
    res.json(deletedCollection)
  })
})

// update a collection
router.put('/:id', (req, res) => {
  Collections.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCollection) => {
    res.json(updatedCollection)
  })
})

// add a song to a collection
router.post('/addsong/:id', (req, res) => {
  Collections.findById(req.params.id, (err, foundCollection) => {
    // console.log(req.body[0]);
    foundCollection.songs.push(req.body[0]);
    foundCollection.save()
    res.json(foundCollection)
  })
})

module.exports = router;
