const router = require('express').Router();
const { Blogs, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blogs.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bloged = blogData.map((data) => data.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        bloged, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});