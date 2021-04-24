const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError.js');

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Токен не передан!');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new AuthError('Неправильный токен авторизации'));
  }
};

module.exports = auth;
