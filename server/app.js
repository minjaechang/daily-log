const express = require('express');
const cors = require('cors');
const postsRouter = require('./router/posts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

module.exports = app;
