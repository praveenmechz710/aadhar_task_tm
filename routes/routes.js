const express = require('express');
const router = express.Router();
const registrationRoutes = require('./registration/reg-routes');

router.use('/registration',registrationRoutes);

module.exports = router;