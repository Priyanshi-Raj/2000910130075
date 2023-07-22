const express = require('express');
const router = express.Router();
const Train = require('../models/train');
// Middleware
const authorize = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }

  
    const response = await axios.post('http://20.244.56.144/train/validate', {
      authToken: authorization,
    });

    if (!response.data.valid) {
      return res.status(401).json({ error: 'Invalid authorization token' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
router.get('/trains', authorize, async (req, res) => {
  try {
   
    const response = await axios.get('http://20.244.56.144/train/trains', {
      headers: { Authorization: req.headers.authorization },
    });

    const trainDetails = response.data;
    res.status(200).json(trainDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
    const trains = await Train.find({ departureTime: { $gt: twelveHoursFromNow } }).lean();
    trains.sort((a, b) => {
      // Sort based on price in ascending order
      if (a.prices.AC !== b.prices.AC) {
        return a.prices.AC - b.prices.AC;
      }

      // Sort based on tickets in descending order
      if (a.seatAvailability.AC !== b.seatAvailability.AC) {
        return b.seatAvailability.AC - a.seatAvailability.AC;
      }

      const aDepartureTimeWithDelay = new Date(a.departureTime.getTime() + a.delayMinutes * 60 * 1000);
      const bDepartureTimeWithDelay = new Date(b.departureTime.getTime() + b.delayMinutes * 60 * 1000);
      return bDepartureTimeWithDelay - aDepartureTimeWithDelay;
    });

    res.json(trains);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


