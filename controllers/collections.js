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
    console.log(foundCollections);
  })
})

//show the songs in a collection -- not sure if this works yet.
router.get('/:collectionid', (req, res) => {
  Collections.findById(req.params.collectionid, (error, foundCollection) => {
    for(let i=0; i<foundCollection.songs.length; i++){
      Songs.findById(foundCollection.songs[i], (error, foundSongs) => {
        res.json(foundSongs)
      })
    }
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

module.exports = router;
