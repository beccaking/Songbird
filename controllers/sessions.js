const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js')

//log in or set the session cookie
router.get('/', (req, res) => {
  res.json(req.session.user)
})

//logout or destroy session
router.delete('/', (req, res) => {
  req.session.destroy(()=>{
    res.json({
      destroyed: true
    })
  })
})

module.exports = router;
