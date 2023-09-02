const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('../models');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// setup passport-jwt
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
};

passport.use(
  new JWTStrategy(jwtOptions, (req, jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
      .then((user) => {
        req.user = user;
        cb(null, user);
      })
      .catch((err) => cb(err));
  })
);

module.exports = passport;
