const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const cors = require('cors');
app.use(cors());



app.use(express.json());

const mongoURI = '';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connection succesful');
});

mongoose.connection.on('error', (err) => {
  console.error('Error:', err);
});

const trainRoutes = require('./routes/trainroute');
const registerRoutes = require('./routes/registerroute'); 

app.use('/trains', trainRoutes);
app.use('/register', registerRoutes); 

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
