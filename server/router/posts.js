const express = require('express');
const postController = require('../controller/posts');

const router = express.Router();

// GET /posts
router.get('/', postController.getPosts);

// GET /posts/:id
router.get('/:id', postController.getPost);

// POST /posts
router.post('/', postController.createPost);

// PUT /posts/:id
router.put('/:id', postController.updatePost);

// DELETE /posts/:id
router.delete('/:id', postController.deletePost);

module.exports = router;
