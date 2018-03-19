const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        lowercase: true
    },
    summary: {
        type: String,
        trim: true
    },
    body: {
        type: String,
        trim: true
    },
    tags: {
        type: [String],
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    coverImage: {
        type: String
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

postSchema.pre('update', function () {
    this.update({}, { $set: { updatedDate: new Date() } });
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
