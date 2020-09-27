const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = (user, secret) => ({
  accessToken: jwt.sign(user, secret, {
    expiresIn: config.expiresAccessIn, // expires in 2 days
  }),
  refreshToken: jwt.sign(user, secret, {
    expiresIn: config.expiresRefreshIn, // expires in 14 days
  }),
});
