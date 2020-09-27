const flightLandingPage = (req, res, app) => {
  return app.render(req, res, '/flight-landing', {
    name: req.params.name,
    airport: req.params.airport,
    userAgent: req.headers['user-agent']
  })
};

module.exports = flightLandingPage;