const express = require('express');
const router = express.Router();

const PostController = require('./../controllers/post.controller');
const CategoryController = require('./../controllers/category.controller');

const RouteHandler = require('./../handlers/route.handler');

router.get('/posts', (req, res) => {
    PostController.getPostsPublished()
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/posts/category/:categorySlug', (req, res) => {
    PostController.getPostsByCategorySlug(req.params.categorySlug)
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/post/:slug', (req, res) => {
    PostController.getPostBySlug(req.params.slug)
        .then((post) => res.send(post))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting post', err));
});

router.get('/posts/recent/:numberOfPosts', (req, res) => {
    PostController.getRecentPosts(+req.params.numberOfPosts)
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/posts/search/:query', (req, res) => {
    PostController.getPostsByTitle(req.params.query)
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/posts/tag/:tag', (req, res) => {
    PostController.getPostsByTag(req.params.tag)
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting posts', err));
});

router.get('/tags', (req, res) => {
    PostController.getTags()
        .then((tags) => res.send(tags))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting tags', err));
});

router.get('/categories', (req, res) => {
    CategoryController.getCategoriesWithPostsThatPublished()
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting categories', err));
});

router.get('/overall', (req, res) => {
    let overallData = [];
    PostController.getNumberOfPosts(overallData)
        .then(CategoryController.getNumberOfCategories)
        .then((overallData) => {
            PostController.getTags()
                .then((tags) => {
                    overallData.push({
                        'name': 'Tags',
                        'value': tags.length
                    });
                    res.send(overallData);
                });
        })
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
