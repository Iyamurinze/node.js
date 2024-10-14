const express = require('express');
const morgan = require('morgan');
const mongoose =  require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://iymzjeremie:iymz@nodejs.zfhqw.mongodb.net/Blogs?retryWrites=true&w=majority&appName=nodeJs';
mongoose.connect(dbURI)
 .then(() => app.listen(3000))
 .catch((err) => console.error('connection error:',err));

app.set('view engine', 'ejs');
app.use(morgan('dev'))
app.set('views', './views');

//middleware static filee
app.use(express.static('public'));

app.get('/', (req, res) => {
    const blogs=[
        {title: 'yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds starts', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs});
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});  
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new blogs'});
});


app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});


