const router = require('express').Router();
// const apiRoutes = require('..');
// const withAuth = require('../../middleware/auth');
const authRoutes = require('./auth_routes');
// const blogRoutes = require('./blogs');

router.use('/auth', authRoutes);
// router.use('/blogs', blogRoutes);


module.exports = router;