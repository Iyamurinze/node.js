const express = require('express');
const morgan = require('morgan');
const mongoose =  require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
const { render } = require('ejs');
const app = express();

const dbURI = 'mongodb+srv://iymzjeremie:iymz@nodejs.zfhqw.mongodb.net/Blogs?retryWrites=true&w=majority&appName=nodeJs';
mongoose.connect(dbURI)
 .then(() => app.listen(3000))
 .catch((err) => console.error('connection error:',err));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.set('views', './views');



//middleware static filee

app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});  
});

app.get('/blogs', (req, res) =>{
    Blog.find().sort({ createdAt: -1 })
    .then((result) =>{
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result) =>{
        res.redirect('/blogs');
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details',{
            blog: result,
            title: result.title
        });
   })
    .catch(err =>{
        console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new blogs'});
});


app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});


