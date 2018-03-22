const express = require('express');
const router = express.Router();

const PostController = require('./../controllers/post.controller');
const CategoryController = require('./../controllers/category.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/posts', (req, res) => {
    PostController.getPosts()
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/tags', (req, res) => {
    PostController.getTags()
        .then((tags) => res.send(tags))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting tags', err));
});

router.get('/categories', (req, res) => {
    CategoryController.getCategories()
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting categories', err));
});

module.exports = router;
