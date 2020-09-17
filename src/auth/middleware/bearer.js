'use strict';

const users = require('../models/users-model.js');

module.exports = (request,response,next) => {

    if(!request.headers.authorization) {
        next('invalid login');
    }
    let token = request.headers.authorization.split(' ')[1];
    users.authenticateWToken(token)
        .then (validate => {
            request.user = validate;
            request.token = token;
            next();
        })
        .catch(error => next('invalid login'));
}