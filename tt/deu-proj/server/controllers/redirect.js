const request = require('request-promise');

const REDIRECT_URL = `${process.env.API_URL}/api/haltestelle/redirect`;

const redirect = async (req, res) => {
  const { name: stopName } = req.params;
  const { date, time, dir } = req.query;
  const queryString = `${date ? `date=${date}&` : ''}${time ? `time=${time}&` : ''}${dir ? `direction=${dir}` : ''}`;
  let targetUrl = `${req.protocol}://${process.env.MAIN_DOMAIN}/haltestelle/${stopName}?${queryString}`;
  try { 
    const response = await request({
      url: `${REDIRECT_URL}?name=${stopName}`,
      json: true
    });

    if (response.error) {
      return res.redirect(targetUrl);
    }
    targetUrl = `${req.protocol}://${process.env.MAIN_DOMAIN}/haltestelle/${response.state}/${response.city}/${response.name}?${queryString}`;
    return res.redirect(targetUrl);
  } catch (err) {
    return res.redirect(targetUrl);
  }
};

module.exports = redirect;