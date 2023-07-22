const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Get the registration details from the request body
    const { companyName, ownerName, rollo, ownerEmail, accessCode } = req.body;

    const Company = require('../models/registration'); 
    const newCompany = new Company({
      companyName,
      ownerName,
      rollo,
      ownerEmail,
      accessCode,
    });
    const { v4: uuidv4 } = require('uuid');
    const clientID = uuidv4();
    const clientSecret = uuidv4();
    newCompany.clientID = clientID;
    newCompany.clientSecret = clientSecret;

    await newCompany.save();

    res.status(200).json({ companyName, clientID, clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
