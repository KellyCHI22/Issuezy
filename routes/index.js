const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { apiErrorHandler } = require('../middlewares/error-handler');

router.post('/users/signup', userController.signUp);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/', apiErrorHandler);

module.exports = router;
