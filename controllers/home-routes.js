const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const { withAuth, withNoAuth } = require('../utils/auth');
const { Op } = require('sequelize');

// Route "/"

// Route "/login"

router.get('/', withAuth, async (req, res) => {
  try {
    const where = {
      user_id: req.session.user_id,
    };

    const blogData = await Blog.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'username'],
      },
        {
          model: Comment
        }
      ]
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
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

// Route "/blogs/new"

// Route "/blogs/edit/:id"

// Route "/blogs/:id"
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