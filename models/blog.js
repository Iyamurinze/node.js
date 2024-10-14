const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: string,
        required: true
    },
    snippet: {
        type: string,
        required: true
    },
    body: {
        type: string,
        required: true
    }
}, 
{timestampsa: true});

const Blog = mongoose.model('Blog ')

