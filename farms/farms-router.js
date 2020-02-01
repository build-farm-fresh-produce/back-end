
const express = require('express');

const Farms = require('./farms-model.js');

const router = express.Router();

const authenticate = require('../auth/authenticate-middleware');


//Get List of Farms
router.get('/', authenticate, (req, res) => {
  Farms.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get farms' });
  });
});


//Add new Farm
router.post('/', (req, res) => {
    const farmData = req.body;
  
    Farms.addFarm(farmData)
    .then(farm => {
      res.status(201).json(farm);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new farm' });
    });
  });

//Edit Farm by Id
router.put('/:id', authenticate, (req, res) => {


  const { id } = req.params;
  const changes = req.body;

  Farms.findById(id)
  .then(scheme => {
    if (scheme) {
      Farms.update(changes, id)
      .then(updatedFarm => {
        res.json(updatedFarm);
      });
    } else {
      res.status(404).json({ message: 'Could not find Farm with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update Farm' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

  module.exports = router;