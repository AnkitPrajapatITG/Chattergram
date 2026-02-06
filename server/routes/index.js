const express = require('express');
const { signup } = require('../controller/auth.controller');
const router = express.Router();

router.post('/auth/signUp', signup);


module.exports = router;