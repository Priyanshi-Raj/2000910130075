const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { companyID, clientID, clientSecret } = req.body;
    const response = await axios.post('http://20.244.56.144/train/auth', {
      companyID,
      clientID,
      clientSecret,
    });

    const { authToken } = response.data;
    res.status(200).json({ authToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
