const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

router.post('/register', register);

module.exports = router;

const { register, login } = require('../controllers/authController');
router.post('/login', login);

const { register, login, logout } = require('../controllers/authController');
router.post('/logout', logout);
