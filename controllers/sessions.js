const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Songbird = require('../models/songbirds.js')

router.post('/', (req, res) => {
    Songbird.findOne({username:req.session.username}, (error, foundUser) => {
        if(foundUser === null){
            res.json({
                message:'user not found'
            })
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
                req.session.user = foundUser;
                res.json(foundUser);
            } else {
                res.json({
                    message:'user not found'
                })
            }
        }
    })
})

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
