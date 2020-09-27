const testPageCtrl = require('../controllers/testPage');

module.exports = (router, app) => {
  router.get('/', (req, res) => testPageCtrl(req, res, app))
}