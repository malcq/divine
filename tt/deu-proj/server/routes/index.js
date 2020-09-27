const express = require('express');
const routes = require('require-dir')();

/**
 * Each route in routes' dir should be named as router path 
 * and in the same register
 */

module.exports = (server, app) => {
  Object.keys(routes).forEach((routeName) => {
    const router = express.Router();
    // require(`./${routeName}`)(router, app);
   routes[routeName](router, app);
    server.use(`/${routeName}`, router);
  })
}