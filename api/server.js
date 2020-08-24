const express = require('express');
const helmet = require('helmet');

//Router import here
const authRouter = require('../auth/auth-router');
// const howRouter = require('../howTo/howTo-router');

//Global Middleware here
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2> How-To API is UP! </h2>`)   
})

server.use('/api/auth', authRouter);
// server.use('/api/howto', authenticate, howToRouter);

module.exports = server;

