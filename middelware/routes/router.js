'use strict';
const express = require('express');
const basicAuth = require('../../auth/middleware/basic.js')
const bearer = require('../../auth/middleware/bearer.js');
const signUp = require('../signUp.js');
const can = require('../../auth/middleware/acl.js');
const router = express.Router();


router.post ('/signup',signUp, async (request, response, next) => {
});

// modularize this route using middleware
router.post('/signin', bearer, async (request,response,next) => {
    let showUser = {
        user:request.user,
        token:request.token
    }
    response.status(200).send(showUser);
});

router.get('/secretarea', bearer, async(request, response,next) => {
    response.status(200).send(`Welcome to the Secret Area...${request.user.username}`);
});

router.get('/article', bearer, can('read'), (request,response) => {
    response.status(200).send('you can read stuff');
});

router.get('/article', bearer, can('update'), (request,response) => {
    response.status(200).send('you can update stuff');
});

router.get('/article', bearer, can('delete'), (request,response) => {
    response.status(200).send('you can delete stuff');
});


module.exports = router; 