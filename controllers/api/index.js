const router = require('express').Router();
// const apiRoutes = require('..');
// const withAuth = require('../../middleware/auth');
const authRoutes = require('./auth_routes');

router.use('/auth', authRoutes);

module.exports = router;