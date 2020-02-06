
const express = require('express');

const Inv = require('./inventory-model.js');

const router = express.Router();

const authenticate = require('../auth/authenticate-middleware');


//Get List of inventory
router.get('/', authenticate, (req, res) => {
  Inv.find()
  .then(inventory => {
    res.json(inventory);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Inventory' });
  });
});


//Add new Inventory Product
router.post('/', (req, res) => {
    
    const productData = req.body;
  
    Inv.addProduct(productData)
    .then(product => {
      res.status(201).json(product);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new inventory product' });
    });
  });

//Edit Inv by Id
router.put('/:id', authenticate, (req, res) => {


  const { id } = req.params;
  const changes = req.body;

  Inv.findById(id)
  .then(inventory => {
    if (inventory) {
      Inv.update(changes, id)
      .then(updatedInventory => {
        res.json(updatedInventory);
      });
    } else {
      res.status(404).json({ message: 'Could not find Inventory with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update Inventory' });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Inv.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find inventory with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete inventory' });
  });
});

  module.exports = router;