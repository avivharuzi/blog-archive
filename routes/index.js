const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const postRoute = require('./post.route');
const blogRoute = require('./blog.route');

const AuthHandler = require('./../handlers/auth.handler');

const routes = (app) => {
    app.use('/auth', authRoute);
    app.use('/api/blog', blogRoute);
    app.use('/api', AuthHandler.authenticate);
    app.use('/api/category', categoryRoute);
    app.use('/api/post', postRoute);
};

module.exports = routes;
