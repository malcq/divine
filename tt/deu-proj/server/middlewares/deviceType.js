const isMobileJs = require('ismobilejs').default;

const getDeviceInfo = (userAgent) => {
  if (!userAgent) {
    return {
      type: 'mobile',
    }
  }

  let type = 'mobile';
  if (isMobileJs(userAgent).phone) {
    type = 'mobile';
  } else if (isMobileJs(userAgent).tablet) {
    type = 'tablet';
   } else {
    type = 'desktop';
  }

  return {
    type,
  }
}

const getDeviceType = (req, res, next) => {
  let userAgent = req.headers['user-agent']; 
  const deviceInfo = getDeviceInfo(userAgent);
  req.deviceInfo = deviceInfo;
  next();
}

module.exports = getDeviceType;