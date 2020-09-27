const stopPageCtrl = require('../controllers/stopPage');

module.exports = (router, app) => {
  router.get('/:state/:city/:stop', (req, res) => stopPageCtrl(req, res, app))
}