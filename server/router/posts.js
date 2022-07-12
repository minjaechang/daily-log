const express = require('express');
const { isValidObjectId } = require('mongoose');
const PostModel = require('../models/PostModel');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  const posts = await PostModel.find();
  res.send(posts);
});

// GET /posts/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  // use isValidObjectId API from mongoose to check if the given id is valid
  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const post = await PostModel.findById(id);

  if (post === null) {
    return res.status(404).send({ message: 'No post in that id' });
  }

  res.status(200).send(post);
});

// POST /posts
router.post('/', async (req, res, next) => {
  const { title, body, name, username } = req.body;

  const newDocument = {
    title,
    body,
    name,
    username,
  };

  const post = new PostModel(newDocument);
  await post.save();
  return res.status(201).send(post);
});

// PUT /posts/:id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const updated = {
    title,
    body,
  };

  const post = await PostModel.findOneAndUpdate({ _id: id }, updated);

  if (post === null) {
    return res.status(404).send({ message: 'No post in that id' });
  }

  res.status(200).send(post);
});

// DELETE /posts/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const post = await PostModel.findOneAndDelete({ _id: id });

  if (post === null) {
    return res.status(404).send({ message: 'No post in that id' });
  }

  res.status(204).send({ message: 'Deleted!' });
});

module.exports = router;
