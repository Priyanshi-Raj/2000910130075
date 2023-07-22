
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  companyName: String,
  ownerName: String,
  rollNumber: String,
  ownerEmail: String,
  accessCode: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
