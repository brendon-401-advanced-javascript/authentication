'use strict';

// dependancies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const users = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type:String, required: true, default: 'regular', enum: ['regular', 'author', 'editor', 'admin']}
});

const roles = {
    regular: ['read'],
    writers: ['read', 'create'],
    editors:['read', 'create', 'update'],
    administrators:['read','create','update', 'delete']
}

// presave password 
users.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
    console.log('password is:', this.password);
});

// works with an instance
users.methods.generateToken = function() {
    // use token object to add permissions
    
    let tokenObject = {
        username:this.username,
        role:this.role,
        permissions:roles[this.role]
    }
    let token = jwt.sign(tokenObject, process.env.SECRET);
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
users.statics.authenticateWToken = function(token){
    let parsedToken = jwt.verify(token, process.env.SECRET);
    return this.findOne({username:parsedToken.username});
}

module.exports = mongoose.model('users', users);