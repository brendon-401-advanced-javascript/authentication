'use strict';
const express = require('express');
const app = express();
const basicAuth = require('../../auth/middleware/basic.js')
const signUp = require('../signUp.js');
const router = app;


router.post ('/signup',signUp, async (request, response, next) => {
});

// modularize this route using middleware
router.post('/signin',basicAuth, async (request,response,next) => {
    let showUser = {
        user:request.user,
        token:request.token
    }
    response.status(200).send(showUser);
});

module.exports = router; 