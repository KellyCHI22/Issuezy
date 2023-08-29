const userService = require('../services/user-service');

const userController = {
  signUp: (req, res, next) => {
    userService.signUpUser(req, (err, data) => {
      if (err) return next(err); // 接住前面拋出的錯誤，呼叫專門做錯誤處理的 middleware
      res.json({ status: 'success', data });
    });
  },
};

module.exports = userController;
