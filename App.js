// Import dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const blogsRouter = require('./routes/blogsRoutes');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

// Redirect root route to blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs',blogsRouter);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

