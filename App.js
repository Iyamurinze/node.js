// Import dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

// MongoDB connection
const dbURI = 'mongodb+srv://iymzjeremie:iymz@nodejs.zfhqw.mongodb.net/Blogs?retryWrites=true&w=majority&appName=nodeJs';
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.error('connection error:', err));

// Set view engine and middleware
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');

// Redirect root route to blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Route to create new blog (MUST COME BEFORE THE DYNAMIC ROUTE)
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
});

// Display all blogs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Post new blog
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Dynamic route for individual blog (AFTER create route)
app.get('/blogs/:id', (req, res) => {
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
            console.log(err);
        });
});

// Delete a blog
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
