// Repository
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

async function getAllPosts() {
  return Post.find();
}

async function getPostById(id) {
  return Post.findById(id);
}

async function createPost(title, body, name, username) {
  const newDocument = {
    title,
    body,
    name,
    username,
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

  const post = await Post.findOneAndUpdate({ _id: id }, updated, {
    returnOriginal: false,
  });
  return post;
}

async function deletePost(id) {
  return Post.findOneAndDelete({ _id: id });
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
