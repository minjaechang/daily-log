const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../data/auth');
const dotenv = require('dotenv');
dotenv.config();

const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const jwtExpiresInDays = parseInt(process.env.JWT_EXPIRES_IN_DAYS);
const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function signup(req, res, next) {
  const { username, password, name, email } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res
      .status(409)
      .send({ message: `username ${username} already exists` });
  }

  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashedPassword,
    name,
    email,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const found = await userRepository.findByUsername(username);
  if (!found) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = bcrypt.compare(password, found.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const token = createJwtToken(found.id);
  res.status(200).json({ token, username });
}

async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

module.exports = {
  signup,
  login,
  me,
};
