module.exports = (req, res, app) => {
  // Use when subdomains will be ready
  // const scheme = req.get('host').join('.')[0];
  return app.render(req, res, '/line', {
    // scheme,
    scheme: req.params.scheme,
    line: req.params.line,
    type: req.params.type,

    current_stop: req.query.current_stop,
    date: req.query.date,
    time: req.query.time,

    direction: req.query.direction,
    userAgent: req.headers['user-agent']
  });
};
