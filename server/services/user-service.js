const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { customError } = require('../helpers/error-helper');

const userService = {
  signUpUser: async (req, cb) => {
    const { name, email, password, passwordCheck } = req.body;
    try {
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0 ||
        passwordCheck.trim().length === 0
      )
        throw customError(400, 'All fields are required!');
      if (password !== passwordCheck) {
        throw customError(400, 'Passwords do not match!');
      }
      const user = await User.findOne({ where: { email } });
      if (user) throw customError(400, 'Email already exists!');
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const userData = newUser.toJSON();
      delete userData.password;
      cb(null, { user: userData });
    } catch (err) {
      cb(err);
    }
  },
  signInUser: async (req, cb) => {
    const { email, password } = req.body;
    try {
      if (email.trim().length === 0 || password.trim().length === 0)
        throw customError(400, 'Email and password cannot be blank!');
      const user = await User.scope('withPassword').findOne({
        where: { email },
      });
      if (!user) throw customError(400, 'Email or password is wrong!');
      const res = await bcrypt.compare(password, user.password);
      if (!res) throw customError(400, 'Email or password is wrong!');

      const userData = user.toJSON();
      delete userData.password;
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      return cb(null, {
        token,
        user: userData,
      });
    } catch (err) {
      return cb(err);
    }
  },
};

module.exports = userService;
