'use strict'

require('dotenv').config();

/** @type {*} 
 * mongoose dependancy
 * server.js file dependancy
 */
let mongoose = require('mongoose');
let server = require('./src/server.js');

// connect to mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// server start

server.start(process.env.PORT);

