const journeyPage = (req, res, app) => {
  return app.render(req, res, '/journeys', {
    originname: req.query.originname,
    destinname: req.query.destinname,
    origin_type: req.query.origin_type,
    destination_type: req.query.destination_type,

    time: req.query.time,
    date: req.query.date,
    direction: req.query.direction,

    passengers_train_card: req.query.passengers_train_card,
    zeit_from: req.query.zeit_from,
    changeovers: req.query.changeovers,
    price: req.query.price,
    person: req.query.person,
    transport_type: req.query.transport_type,
    
    // TODO: remove when api is ready
    stop_type: req.query.stop_type,

    userAgent: req.headers['user-agent']
  });
}

module.exports = journeyPage;