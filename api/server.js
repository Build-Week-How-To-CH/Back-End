const express = require('express');
const helmet = require('helmet');

//Router import here
const authRouter = require('../auth/auth-router');
const howToRouter = require('../howTo/how-to-router');
const userRouter = require('../users/users-router')

//Global Middleware here
const server = express();
const authenticate = require('../auth/authenticate-mw')

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2> How-To API is UP! </h2>`)   
})

//Routes here
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/howto', authenticate, howToRouter);

module.exports = server;

