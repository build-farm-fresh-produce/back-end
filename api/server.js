const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const farmsRouter = require('../farms/farms-router.js');
const productsRouter = require('../products/products-router.js');
const inventoryRouter = require('../inventory/inventory-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        message:"Welcome To Farm Fresh Produce!"
    })
})

server.use('/api/auth', authRouter);

server.use('/api/farms', farmsRouter);

server.use('/api/products', productsRouter);

server.use('/api/inventory', inventoryRouter);


module.exports = server;
