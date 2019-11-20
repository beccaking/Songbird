// Dependencies ===============
const express = require('express');
const app = express();
require('dotenv').config()
app.listen(3000);

// Port ===============
const PORT = process.env.PORT;

// Database ===============
const MONGODB_URI = process.env.MONGODB_URI;

console.log(process.env);
