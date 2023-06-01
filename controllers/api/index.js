const router = require('express').Router();
const apiRoutes = require('..');
const withAuth = require('../../middleware/auth');

// const userRoutes = require('./auth_routes');
// const browseRoutes = require('./browse-route');
// const suggesterRoutes = require('./suggester_routes');
const authRoutes = require('./auth_routes');
// router.use('/users', userRoutes);
// router.use('/browse', browseRoutes);
// router.use('/suggester', suggesterRoutes);
router.use('/auth', authRoutes);

module.exports = router;