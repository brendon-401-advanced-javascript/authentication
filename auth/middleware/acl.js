'use strict';


module.exports = (capability) => {
    return (request, response, next) => {
        if (request.user.can(capability)) {  
        next();
        } else {
            next('Incorrect Permissions to perform this action')
        }
    }
}