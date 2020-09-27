const flightLandingCtrl = require('../controllers/flightLandingPage');
const journeyLandingCtrl = require('../controllers/journeyLandingPage');
const journeyPageCtrl = require('../controllers/journeyPage');

module.exports = (router, app) => {
  router.get('/flughafen/:name/:airport', (req, res) => flightLandingCtrl(req, res, app))
  router.get('/place/:name', (req, res) => journeyLandingCtrl(req, res, app))
  router.get('/:journeys', (req, res) => journeyPageCtrl(req, res, app))
};