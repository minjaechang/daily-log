const express = require('express');
const authController = require('../controller/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const isAuth = require('../middleware/auth');

const router = express.Router();

const validateCredential = [
  body('username')
    .notEmpty()
    .trim()
    .withMessage('username is missing')
    .isLength({ min: 5 })
    .withMessage('username should be at least 5 characters'),
  body('password')
    .notEmpty()
    .trim()
    .withMessage('password is missing')
    .isLength({ min: 6 })
    .withMessage('password should be at least 6 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('name is missing'),
  body('email').trim().isEmail().normalizeEmail().withMessage('invalid email'),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);

module.exports = router;
