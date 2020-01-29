const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const farmsRouter = require('../farms/farms-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        message:"Welcome To Farm Fresh Produce"
    })
})

server.use('/api/auth', authRouter);
// server.use('/api/farms', authenticate, farmsRouter);

module.exports = server;
