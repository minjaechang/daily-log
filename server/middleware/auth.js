const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userRepository = require('../data/auth');

const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    req.userId = user.id; // req.customData 등록
    req.token = token;
    next();
  });
};

module.exports = isAuth;
