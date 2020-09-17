'use strict';

// dependancies 
const express = require('express');
// const basicAuth = require('./src/auth/middleware/basic.js')
// const users = require('./src/auth/models/users-model.js');
const signUp = require('./src/middelware/routes/router.js');
const router = require('./src/middelware/routes/router.js');
const app = express();

// middleware(global)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);
app.use(signUp);




// 404 
app.use('*', (request, response, next) => {
    response.status(404).send('not found');
});

// server error handler
app.use((err,request,response, next) => {
    response.status(500).send(err);
});

module.exports = {
    app, 
    start: (port) => app.listen(port, console.log('server up on:', port))
}

