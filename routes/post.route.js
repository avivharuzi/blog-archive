const express = require('express');
const router = express.Router();

const PostController = require('./../controllers/post.controller');
const CategoryController = require('./../controllers/category.controller');
const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    PostController.getPosts()
        .then((posts) => res.send(posts))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.post('/', (req, res) => {
    PostController.validatePost(req.body, req.files)
        .then(PostController.validateAndUploadPostImage)
        .then(PostController.savePost)
        .then(CategoryController.addPostToCategory)
        .then((newPost) => RouteHandler.success(res, 'New post added successfully', newPost))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by saving this post', err))
});

router.put('/:id', (req, res) => {
    PostController.validatePost(req.body, req.files, req.params.id)
        .then(PostController.validateAndUploadPostImage)
        .then(PostController.checkAndDeleteOldImage)
        .then(CategoryController.removePostFromCategoryUpdate)
        .then(PostController.updatePost)
        .then(CategoryController.addPostToCategory)
        .then((updatedPost) => RouteHandler.success(res, 'This post updated successfully', updatedPost))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.delete('/:id', (req, res) => {
    PostController.deletePost(req.params.id)
        .then(PostController.deleteImage)
        .then(CategoryController.removePostFromCategory)
        .then(() => RouteHandler.success(res, 'This post deleted successfully', ''))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
