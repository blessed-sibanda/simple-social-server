const jwt = require('jsonwebtoken');

const config = require('../config');

const createJwt = (user) => {
  const payload = {
    email: user.email,
    id: user._id,
  };
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    subject: user._id.toString(),
    expiresIn: '1d',
  });
  return accessToken;
};

module.exports = { createJwt };
