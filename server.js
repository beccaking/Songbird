// Dependencies ===============
const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const app = express();
require('dotenv').config()

// Port ===============
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('listening on port', PORT)
});

// Database ===============
const MONGODB_URI  = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI  ,  {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true});

// Error / Success ===============
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Routes ===============
app.get('/', (req, res) => {
    res.send('Hello World!');
})
