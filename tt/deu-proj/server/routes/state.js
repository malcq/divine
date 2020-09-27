const federalPageCtrl = require('../controllers/federalPage');

module.exports = (router, app) => {
  router.get('/:title', (req, res) => federalPageCtrl(req, res, app, 'state'));
}