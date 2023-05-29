const jwt = require('jsonwebtoken');

const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

function create(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
}

function verify(token) {
  return jwt.verify(token, SECRET_KEY);
}

const JWT = { create, verify };

module.exports = JWT;