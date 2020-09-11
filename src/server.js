'use strict';

// dependancies 

const express = require('express');
const user = require('../src/auth/models/users-model.js');
const base64 = require('base-64');

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
app.post('/signin', async (request,response,next) => {

    try {
        // get username and pass from user
        // check the headers
        let authorization = request.headers.authorization;
        let encoded = authorization.split(' ')[1];
        let creds = base64.decode(encoded);
        let [username, password] = creds.split(":");

        // get user instance from model
        let userRecord = await users.validateBasic(username, password); 

        // if ok send token
        let token = userRecord.generateToken();
    
    } catch (e) {
        next(e.message); 
    }
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

