'use strict';
const Users = require('../auth/models/users-model.js');
module.exports = async(request,response,next) => {
    try {

        let obj = {
            username: request.body.username,
            password: request.body.password,
            role: request.body.role,
            info: request.body.info
        }

        let record = new Users(obj);
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