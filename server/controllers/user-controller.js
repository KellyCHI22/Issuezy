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
  checkPermission: (req, res, next) => {
    userService.checkPermission(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  getCurrentUser: (req, res, next) => {
    userService.getCurrentUser(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = userController;
