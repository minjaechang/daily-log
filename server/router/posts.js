const express = require('express');
const postController = require('../controller/posts');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

const validatePost = [
  body('title')
    .notEmpty()
    .trim()
    .withMessage('Enter the title')
    .isLength({ min: 2, max: 30 })
    .withMessage('title should be at least 2 characters long'),
  body('body')
    .notEmpty()
    .trim()
    .withMessage('Please enter something')
    .isLength({ min: 2 })
    .withMessage('body should be at least 2 characters long'),
  validate,
];

// GET /posts
router.get('/', postController.getPosts);

// GET /posts/:id
router.get('/:id', postController.getPost);

// POST /posts
router.post('/', validatePost, postController.createPost);

// PUT /posts/:id
router.put('/:id', validatePost, postController.updatePost);

// DELETE /posts/:id
router.delete('/:id', postController.deletePost);

module.exports = router;
