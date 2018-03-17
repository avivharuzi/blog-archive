const express = require('express');
const router = express.Router();

const PostController = require('./../controllers/post.controller');
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
        .then((newPost) => RouteHandler.success(res, 'New post added successfully', newPost))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by saving this post', err))
});

router.put('/:id', (req, res) => {
    //
});

module.exports = router;
