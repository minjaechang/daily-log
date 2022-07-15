// Repository
const mongoose = require('mongoose');
const useVirtualId = require('../database/database.js');
const userRepository = require('./auth.js');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

useVirtualId(postSchema);

const Post = mongoose.model('Post', postSchema);

async function getAllPosts() {
  return Post.find();
}

async function getPostById(id) {
  return Post.findById(id);
}

async function createPost(title, body, userId) {
  const user = await userRepository.findById(userId);

  const newDocument = {
    title,
    body,
    username: user.username,
    name: user.name,
    userId,
  };

  const post = new Post(newDocument);
  await post.save();

  return post;
}

async function updatePost(id, title, body) {
  const updated = {
    title,
    body,
  };

  const post = await Post.findByIdAndUpdate(id, updated, {
    returnOriginal: false,
  });
  return post;
}

async function deletePost(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
