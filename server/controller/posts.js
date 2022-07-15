// Controller
const { isValidObjectId } = require('mongoose');
const postRepository = require('../data/posts');

async function getPosts(req, res, next) {
  const posts = await postRepository.getAllPosts();
  res.status(200).send(posts);
}

async function getPost(req, res, next) {
  const { id } = req.params;

  // use isValidObjectId API from mongoose to check if the given id is valid
  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const post = await postRepository.getPostById(id);
  if (post) {
    return res.status(200).send(post);
  } else {
    return res.status(404).send({ message: `Post not found: ${id}` });
  }
}

async function createPost(req, res, next) {
  const { title, body } = req.body;
  const post = await postRepository.createPost(title, body, req.userId);
  return res.status(201).send(post);
}

async function updatePost(req, res, next) {
  const { id } = req.params;
  const { title, body } = req.body;
  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const post = await postRepository.updatePost(id, title, body);
  if (post) {
    return res.status(200).send(post);
  } else {
    return res.status(404).send({ message: `Post not found: ${id}` });
  }
}

async function deletePost(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).send({ message: 'invalid id' });
  }

  const post = await postRepository.deletePost(id);
  if (post) {
    return res.status(204).send(id);
  } else {
    return res.status(404).send({ message: `Post not found: ${id}` });
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
