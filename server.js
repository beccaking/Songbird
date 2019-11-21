// Dependencies ===============
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const collectionsController = require('./controllers/collections.js');
const songsController = require('./controllers/songs.js');
const songbirdsController = require('./controllers/songbirds.js');
const sessionController = require('./controllers/sessions.js');
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

// Middleware ===============
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}))
app.use('/collections', collectionsController);
app.use('/songs', songsController);
app.use('/songbirds', songbirdsController);
app.use('/sessions', sessionController);
