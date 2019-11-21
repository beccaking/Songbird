const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Songbird = require('../models/songbirds.js');

// Create route ===============
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Songbird.create(req.body, (error, createdUser) => {
        res.json(createdUser);
    })
})

// Get route ===============
router.get('/', (req, res) => {
    Songbird.find({}, (error, foundUsers) => {
        res.json(foundUsers);
    })
})

module.exports = router;
