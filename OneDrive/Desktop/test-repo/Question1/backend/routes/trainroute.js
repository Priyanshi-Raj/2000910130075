// routes/trainRoutes.js

const express = require('express');
const router = express.Router();
const Train = require('../models/train');

router.get('/', async (req, res) => {
  try {
    const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
    const trains = await Train.find({ departureTime: { $gt: twelveHoursFromNow } }).lean();

    // Apply sorting logic based on price, tickets, and departure time (including delays)
    trains.sort((a, b) => {
      // Sort based on price in ascending order
      if (a.prices.AC !== b.prices.AC) {
        return a.prices.AC - b.prices.AC;
      }

      // Sort based on tickets in descending order
      if (a.seatAvailability.AC !== b.seatAvailability.AC) {
        return b.seatAvailability.AC - a.seatAvailability.AC;
      }

      // Sort based on departure time (including delays) in descending order
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
