'use strict';
const users = require('../auth/models/users-model.js');
module.exports = async(request,response,next) => {
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
}