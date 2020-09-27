const botAgentsTypes = [
  'Chrome-Lighthouse',
  'Lighthouse'
];

const getReqType = (userAgent) => {
  let isBot = false;
  if (typeof userAgent === 'string') {
    botAgentsTypes.forEach((type) => {
      if (isBot) return;
      const agent = new RegExp(type, 'ig');
      const typeMatch = userAgent.match(agent);
      if (typeMatch) {
        isBot = true;
      }
    })
  }
  return isBot ? 'bot' : 'user';
};

const getUserAgentType = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const reqType = getReqType(userAgent);
  req.reqType = reqType;
  next();
};

module.exports = getUserAgentType;