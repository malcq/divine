const privacyCtrl = require('../controllers/privacyPage');

module.exports = (router, app) => {
  router.get('/', (req, res) => privacyCtrl(req, res, app));
};