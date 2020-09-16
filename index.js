'use strict'

require('dotenv').config();

let mongoose = require('mongoose');
let server = require('./server.js');

// connect to mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// server start

server.start(process.env.PORT);

