const express = require('express');
const router = express.Router();
const Collections = require('../models/collections.js')

//show all collections
router.get('/', (req, res) => {
  Collections.find({}, (error, foundCollections) => {
    res.json(foundCollections)
  })
});

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
