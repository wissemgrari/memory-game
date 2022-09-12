const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get all the data
router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Post user data
router.post('/', async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      score: req.body.score,
    };
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
