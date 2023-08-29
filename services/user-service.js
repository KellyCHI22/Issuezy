const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { customError } = require('../helpers/error-helper');

const userService = {
  signUpUser: (req, cb) => {
    const { name, email, password, passwordCheck } = req.body;
    if (password !== passwordCheck) {
      throw customError(400, 'Passwords do not match!');
    }
    return User.findOne({ where: { email } })
      .then((user) => {
        if (user) throw customError(400, 'Email already exists!');
        return bcrypt.hash(password, 10); // 前面加 return
      })
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then((user) => {
        const userData = user.toJSON();
        delete userData.password;
        delete userData.updatedAt;
        cb(null, { user: userData });
      })
      .catch((err) => cb(err));
  },
};

module.exports = userService;
