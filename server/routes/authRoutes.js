const express = require('express');
const {login, test} = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);

module.exports = router;
