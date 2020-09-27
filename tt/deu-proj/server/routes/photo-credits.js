const photoCreditsCtrl = require('../controllers/photoCreditsPage');

module.exports = (router, app) => {
  router.get('/', (req, res) => photoCreditsCtrl(req, res, app));
};