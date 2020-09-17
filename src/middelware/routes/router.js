'use strict';
const express = require('express');
const basicAuth = require('../../auth/middleware/basic.js')
const signUp = require('../signUp.js');
const router = express.Router();


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