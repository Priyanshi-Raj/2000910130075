const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: String,
  departureTime: Date,
  delayMinutes: Number,
  seatAvailability: {
    sleeper: Number,
    AC: Number,
  },
  prices: {
    sleeper: Number,
    AC: Number,
    
  },
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
