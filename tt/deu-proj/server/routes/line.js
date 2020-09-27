const linePageCtrl = require('../controllers/linePage');

module.exports = (router, app) => {
  router.get('/:scheme/:type-:line', (req, res) => linePageCtrl(req, res, app))
};