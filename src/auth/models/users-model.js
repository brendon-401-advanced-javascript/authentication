'use strict';

// dependancies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'soup';

const users = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

// presave password 
users.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
    console.log('password is:', this.password);
});

// works with an instance
users.methods.generateToken = function() {
    let token = jwt.sign({username: this.username}, secret)
    return token;
}

// works without instance
users.statics.validateBasic = async function (username, password) {
    // look up user
    let user = await this.findOne({username: username});

    // compare passwords
    let isValid = await bcrypt.compare(password, user.password)
    if(isValid) {
        return user;
    } else {
        return undefined;
    }
}

module.exports = mongoose.model('users', users);