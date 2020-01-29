
const express = require('express');

const Farms = require('./farms-model.js');

const router = express.Router();


//Get List of Farms
router.get('/', (req, res) => {
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
  
    Farm.addFarm(farmData)
    .then(farm => {
      res.status(201).json(farm);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new farm' });
    });
  });