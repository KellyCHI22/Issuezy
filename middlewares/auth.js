const passport = require('../config/passport');

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ status: 'error', message: 'unauthorized' });
    }

    next();
  })(req, res, next);
};

module.exports = {
  authenticated,
};
