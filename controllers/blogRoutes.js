const router = require('express').Router();
const { Blog, User } = require('../model');
const withAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bloged = blogData.map((data) => data.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        bloged, 
        loggedIn: req.session?.loggedIn, user: req.session?.user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login', {loggedIn: req.session?.loggedIn, user: req.session?.user}); // Render the login.handlebars template
});
router.get('/logout', (req, res) => {
  res.redirect('/api/auth/logout');
});
router.get('/sign-up', (req, res) => {
  res.render('signup', {loggedIn: req.session?.loggedIn, user: req.session?.user}); // Render the signup.handlebars template
});

router.get('/blogs', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bloged = blogData.map((data) => data.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('myblogs', { 
        bloged, 
        loggedIn: req.session?.loggedIn, user: req.session?.user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id)
    const blog = dbBlogData.get({ plain: true });

    res.render('blogs', { 
      blog,
      loggedIn: req.session?.loggedIn, 
      user: req.session?.user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/blogs', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/editcomment/:id', withAuth, async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.update(
      {
        comment: req.body.comment,
      
      },
      {
        where: {
          id: blogId,
        },
      }
    );
    console.log(updatedBlog);
    
    res.status(200).json(updatedBlog);
    

  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/deleteblogs/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
   
    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;