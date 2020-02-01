
const express = require('express');

const Products = require('./products-model.js');

const router = express.Router();

const authenticate = require('../auth/authenticate-middleware');


//Get List of Products
router.get('/', authenticate, (req, res) => {

  Products.find()
  .then(products => {
    res.json(products);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get products' });
  });
});

//Get Product by Id
router.get('/:id', authenticate, (req, res) => {

    const { id } = req.params

  Products.findById( id )
  .then(products => {
    res.json(products);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get product by id' });
  });
});


//Add new product
router.post('/', authenticate, (req, res) => {
    
    const productData = req.body;
  
    Products.addProduct(productData)
    .then(product => {
      res.status(201).json(product);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new product' });
    });
  });


  module.exports = router;