
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


//Edit Product by Id
router.put('/:id', authenticate, (req, res) => {


  const { id } = req.params;
  const changes = req.body;

  Products.findById(id)
  .then(product => {
    if (product) {
      Products.update(changes, id)
      .then(updatedProduct => {
        res.json(updatedProduct);
      });
    } else {
      res.status(404).json({ message: 'Could not find Product with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update Product' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Products.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find Product with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete Product' });
  });
});

  
  module.exports = router;