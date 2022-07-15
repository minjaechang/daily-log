const mongoose = require('mongoose');
const useVirtualId = require('../database/database');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

useVirtualId(userSchema);

const User = mongoose.model('User', userSchema);

async function findByUsername(username) {
  return await User.findOne({ username });
}

async function findById(id) {
  return await User.findById(id);
}

async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

module.exports = {
  findByUsername,
  createUser,
  findById,
};
