const imprintCtrl = require('../controllers/imprintPage');

module.exports = (router, app) => {
  router.get('/', (req, res) => imprintCtrl(req, res, app));
};