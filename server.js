'use strict';

// dependancies 
const cors = require('cors');
const express = require('express');
// const signUp = require('./middelware/routes/router.js');
const router = require('./middelware/routes/router.js');
const v2Routes = require('./api/v2.js');


const app = express();

// middleware(global)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v2/', v2Routes);

app.use(router);
// app.use(signUp);




// 404 
app.use('*', (request, response, next) => {
    response.status(404).send('not found');
});

// server error handler
app.use((err,request,response, next) => {
    response.status(500).send(err);
});

module.exports = {
    app, 
    start: (port) => app.listen(port, console.log('server up on:', port))
}

