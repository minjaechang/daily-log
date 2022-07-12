const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected!'))
  .catch((err) => console.log(err));

app.get('/posts', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
