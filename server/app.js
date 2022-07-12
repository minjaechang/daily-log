const express = require('express');
const app = express();

app.get('/posts', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
