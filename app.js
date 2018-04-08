const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const AuthHandler = require('./handlers/auth.handler');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds231529.mlab.com:31529/blog`);

const authRoute = require('./routes/auth.route');
const categoryRoute = require('./routes/category.route');
const postRoute = require('./routes/post.route');
const blogRoute = require('./routes/blog.route');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(fileUpload());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/auth', authRoute);
app.use('/api/blog', blogRoute);
app.use('/api', AuthHandler.authenticate);
app.use('/api/category', categoryRoute);
app.use('/api/post', postRoute);

module.exports = app;
