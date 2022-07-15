const express = require('express');
const cors = require('cors');

const postsRouter = require('./router/posts');
const authRouter = require('./router/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});

module.exports = app;
