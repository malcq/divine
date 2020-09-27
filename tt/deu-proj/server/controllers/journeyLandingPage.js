const journeyLandingPage = (req, res, app) => {
  return app.render(req, res, '/journeys-landing', {
    name: req.params.name,

    userAgent: req.headers['user-agent']
  })
};

module.exports = journeyLandingPage;