const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const { withAuth} = require('../utils/auth');
const { Op } = require('sequelize');


// Route "/login"

// Route "/"
router.get('/', async (req, res) => {
  try {
    // const blogData = await Blog.findAll({
    //   include: [{
    //     model: User,
    //     attributes: ['id', 'username'],
    //   }]
    // });

    // const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.send("I'm Alive!");

    // res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {

  const userData = await User.findByPk(req.session.user_id, {
    attributes: ['id','username'],
    include: Blog
  });

  const user = userData.toJSON();

  console.log(user);

  res.render('dashboard', {
    user,
    logged_in: req.session.logged_in,
  });
});

// POST Route "/blogs/new"

// PUT Route "/blogs/edit/:id"

// GET Route "/blogs/:id"
router.get('/blogs/:id', withAuth, (req, res) => {
  try {
    const blogData = Blog.findByPk(req.params.id, {
      include: [
        {model: User, attributes: ['id', 'username']},
        {model: Comment}
      ]
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('single-blog', {
      blogs,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withNoAuth, (req, res) => {
  res.render('login');
});

router.get('/signup', withNoAuth, (req, res) => {
  res.render('signup');
});

module.exports = router;