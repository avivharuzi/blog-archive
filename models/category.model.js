const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true
    },
    image: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('update', function () {
    this.update({}, { $set: { updatedDate: new Date() } });
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
