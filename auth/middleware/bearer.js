'use strict';

const users = require('../models/users-model.js');

module.exports = async(request,response,next) => {
    console.log('before token cosole log');
    if(!request.headers.authorization) {
        next('invalid login');
    }
    let token = request.headers.authorization.split(' ')[1];
    console.log(token);
    let validate = await users.authenticateWToken(token)
        try {
            request.user = validate;
            request.token = token;
            console.log(token);
            next();
        }catch{ (e) => 'Invalid Login';
    }
}