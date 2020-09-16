'use strict';

// dependancies 
const express = require('express');
const basicAuth = require('./src/auth/middleware/basic.js')
const users = require('./src/auth/models/users-model.js');

const app = express();

// middleware(global)

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// modularize /signup post using router method
app.post ('/signup', async (request, response, next) => {
    try {
        // username, password
        // will be on req.body


        // create data model object
        let obj = {
            username: request.body.username,
            password: request.body.password
        }

        // create new schema instance using the object
        let record = new users(obj);

        // save the instance
        let newUser = await record.save();

        // create token
        let token = record.generateToken();

        // show token
        response.status(201).send(token);

    } catch (e) {
        next(e.message);
    }

});

// modularize this route using router method
app.post('/signin',basicAuth, async (request,response,next) => {
       response.status(200).send('you are logged in');
});

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

