const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/user.contrller');

const RouteHandler = require('./../handlers/route.handler');
const AuthHandler = require('./../handlers/auth.handler');

router.post('/register', (req, res) => {
    UserController.validateUser(req.body, req.files)
        .then(UserController.validateProfileImageAndUpload)
        .then(UserController.saveUser)
        .then((newUser) => RouteHandler.success(res, 'You registered successfully', newUser))
        .catch((err) => RouteHandler.error(res, 409, '', err))
});

router.post('/login', (req, res) => {
    UserController.checkUserForLogin(req.body)
        .then(AuthHandler.signUserToJwt)
        .then(token => {
            res.setHeader('authorization', token);
            RouteHandler.success(res, 'User was found', token);
        })
        .catch(err => RouteHandler.error(res, 404, '', err));
});

router.post('/check', (req, res) => {
    let token = req.body.token;

    if (!token) {
        res.status(404).end();
    } else {
        AuthHandler.checkUserToken(token)
            .then(() => RouteHandler.success(res, 'Token verify', token))
            .catch(() => res.status(401).end());
    }
});

module.exports = router;
