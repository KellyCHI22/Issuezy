const userService = require('../services/user-service');

const userController = {
  signUp: (req, res, next) => {
    userService.signUpUser(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  signIn: (req, res, next) => {
    userService.signInUser(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = userController;
