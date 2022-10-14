const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

// Route "/"
router.get('/', async (req, res) => {
  console.log("HOME ROUTE")
  try {
    const blogData = await Blog.findAll({
      include: [
        { model: User, 
        //  attributes: ['id', 'name'] 
        },
        { model: Comment, include: {model: User}},
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    console.log(blogs[1].comments);


    res.render('homepage', { 
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth,  async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: ['id', 'name'],
    include: [
      { model: Comment, include: {model: User}},
    ],
  });

  console.log(req.session.user_id);
  console.log(userData);

  const user = userData.toJSON();

  console.log(user);

  res.render('dashboard', {
    user,
    logged_in: req.session.logged_in,
  });
});

router.get('/login',  (req, res) => {
  res.render('login');
});

router.get('/signup',  (req, res) => {
  res.render('signup');
});

// PUT Route "/blogs/edit/:id"
router.get('/blogs/:id/edit', withAuth, async (req, res) => {
  try {
    console.log("edit route called");
    console.log(req.params.id);
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, 
        //  attributes: ['id', 'name'] 
        },
        { model: Comment, include: {model: User}},
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);

    res.render('edit-blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }})

// GET Route "/blogs/:id"
router.get('/blogs/:id',  async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, 
        //  attributes: ['id', 'name'] 
        },
        { model: Comment, include: {model: User}},
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);

    res.render('single-blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Route "/blogs/new" for new blog form
router.get('/blogs/new',  async (req, res) => {
  try {
    const blog = "blog";
    res.render('new-blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
