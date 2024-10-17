const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const router = express.Router();

// Display all blogs
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Post new blog
router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Route to create new blog (MUST COME BEFORE THE DYNAMIC ROUTE)
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
});

// Dynamic route for individual blog (AFTER create route)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Blog ID');
    }

    Blog.findById(id)
        .then((result) => {
            res.render('details', {
                blog: result,
                title: result.title
            });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found'});
        });
});

// Delete a blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;