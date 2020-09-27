module.exports = (req, res, app, type) => {
  return app.render(req, res, '/federal', {
    type,
    title: req.params.title,
    limit: req.query.limit,
    page: req.query.page,

    userAgent: req.headers['user-agent']
  })
};
