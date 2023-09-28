const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { customError } = require('../helpers/error-helper');

const userService = {
  signUpUser: async (req, cb) => {
    const { firstname, lastname, email, password, passwordCheck } = req.body;
    try {
      if (
        firstname.trim().length === 0 ||
        lastname.trim().length === 0 ||
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
        firstname,
        lastname,
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

      // todo need to change expire time before deploy
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
  checkPermission: async (req, cb) => {
    const { token } = req.body;
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode) {
          delete decode.iat;
          delete decode.exp;
          delete decode.email;
          return cb(null, { decode });
        }
      } catch {
        cb(customError(401, 'Invalid token'));
      }
    } else {
      cb(customError(400, 'Please provide a token'));
    }
  },
  getCurrentUser: async (req, cb) => {
    try {
      const userId = req.user.id;
      const currentUser = await User.findByPk(userId, {
        attributes: ['id', 'firstname', 'lastname', 'email', 'createdAt'],
        raw: true,
      });
      if (!currentUser) throw customError(400, 'User does not exist!');
      return cb(null, { currentUser });
    } catch (err) {
      return cb(err);
    }
  },
  patchUser: async (req, cb) => {
    try {
      const { firstname, lastname } = req.body;
      const userId = req.params.id;
      const currentUserId = req.user.id;
      if (!firstname.trim().length || !lastname.trim().length)
        throw customError(400, 'All fields are required!');
      if (parseInt(userId) !== currentUserId)
        throw customError(
          400,
          'You are not allowed to change other users info!'
        );

      const user = await User.findByPk(userId);
      if (!user) throw customError(400, 'User does not exist!');
      const updatedUser = await user.update({
        firstname,
        lastname,
      });
      return cb(null, { updatedUser });
    } catch (err) {
      return cb(err);
    }
  },
};

module.exports = userService;
