const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
