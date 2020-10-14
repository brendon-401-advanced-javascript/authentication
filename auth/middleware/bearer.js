'use strict';

const users = require('../models/users-model.js');

module.exports = async(request,response,next) => {

    if(!request.headers.authorization) {
        next('invalid login');
    }
    let token = request.headers.authorization.split(' ')[1];
    let validate = await users.authenticateWToken(token)
        try {
            request.user = validate;
            request.token = token;
            console.log(token);
            next();
        }catch{ (e) => 'Invalid Login';
    }
}