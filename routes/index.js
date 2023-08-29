const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { apiErrorHandler } = require('../middlewares/error-handler');
const { authenticated } = require('../middlewares/auth');

// * signup and signin
router.post('/users/signup', userController.signUp);
router.post('/users/signin', userController.signIn);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/', apiErrorHandler);

module.exports = router;
