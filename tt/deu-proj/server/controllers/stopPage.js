const stopPage = (req, res, app) => {
  return app.render(req, res, '/stop', {
    state: req.params.state,
    city: req.params.city,
    stop: req.params.stop,
    date: req.query.date,
    time: req.query.time,
    direction: req.query.direction,
    transports: req.query.transports,
    lines: req.query.lines,
    userAgent: req.headers['user-agent']
  })
}; 

module.exports = stopPage;