const Post = require('./../models/post.model');

const CategoryController = require('./../controllers/category.controller');

const FileHandler = require('./../handlers/file.handler');
const ValidationHandler = require('./../handlers/validation.handler');

class PostController {
    static getPosts() {
        return new Promise((resolve, reject) => {
            Post.find()
                .populate('category')
                .exec((err, posts) => {
                    if (err) {
                        reject(err);
                    } else {
                        posts.map((post) => {
                            post.body = ValidationHandler.decodeHtml(post.body);
                        });
                        resolve(posts);
                    }
                });
        });
    }

    static savePost(post) {
        return new Promise((resolve, reject) => {
            Post.create({
                title: post.title,
                slug: post.slug,
                author: post.author,
                summary: post.summary,
                body: post.body,
                tags: post.tags,
                category: post.category,
                isPublished: post.isPublished,
                coverImage: post.coverImage,
                publishDate: post.publishDate
            }, (err, newPost) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newPost);
                }
            });
        });
    }

    static updatePost(post) {
        return new Promise((resolve, reject) => {
            Post.findByIdAndUpdate(post.id, {
                title: post.title,
                slug: post.slug,
                author: post.author,
                summary: post.summary,
                body: post.body,
                tags: post.tags,
                category: post.category,
                isPublished: post.isPublished,
                coverImage: post.coverImage,
                publishDate: post.publishDate
            }, {
                new: true
            }).exec((err, updatedPost) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(updatedPost);
                }
            });
        });
    }

    static validatePost(post, files, postId = null) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (files && files.coverImage) {
                post.coverImage = files.coverImage;
            } else {
                errors.push('You need to provide cover image');
            }
    
            if (ValidationHandler.regex(post.title, /^[A-Za-z0-9 ]{2,55}$/)) {
                post.title = ValidationHandler.testInput(post.title);
            } else {
                errors.push('Title is invalid');
            }
    
            if (ValidationHandler.regex(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
                post.slug = ValidationHandler.testInput(post.slug);
            } else {
                errors.push('Slug is invalid');
            }
    
            if (ValidationHandler.regex(post.author, /^[A-Za-z ]{3,20}$/)) {
                post.author = ValidationHandler.testInput(post.author);
            } else {
                errors.push('Author is invalid');
            }
    
            if (ValidationHandler.regex(post.publishDate, /^[0-9]*$/)) {
                post.publishDate = ValidationHandler.testInput(post.publishDate);
                post.publishDate = parseInt(post.publishDate);
            } else {
                errors.push('Publish date is invalid');
            }
    
            if (!ValidationHandler.checkScriptTag(post.summary)) {
                post.summary = ValidationHandler.testInput(post.summary);
            } else {
                errors.push('Summary is invalid');
            }
    
            if (!ValidationHandler.checkScriptTag(post.body)) {
                post.body = ValidationHandler.testInput(post.body);
            } else {
                errors.push('Body is invalid');
            }

            if (post.isPublished != 'false' && post.isPublished != 'true') {
                errors.push('Is published is invalid');
            }
    
            if (post.tags.constructor === Array) {
                let tags = post.tags;
                for (let tag of tags) {
                    if (tag.constructor !== String && ValidationHandler.checkScriptTag(tag)) {
                        errors.push('Tags is invalid');
                        break;
                    }
                }
            } else {
                errors.push('Tags is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else if (!postId) {
                post.id = postId;

                PostController.checkCategoryByIdFromPost(post)
                    .then(PostController.checkPostTitleExistUpdate)
                    .then(PostController.checkPostSlugExistUpdate)
                    .then(PostController.checkPostImageExistUpdate)
                    .then(resolve)
                    .catch(reject);
            } else {
                CategoryController.checkCategoryByIdFromPost(post)
                    .then(PostController.checkByTitleExist)
                    .then(PostController.checkBySlugExist)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    static checkByTitleExist(post) {
        return new Promise((resolve, reject) => {
            Post.findOne({
                title: post.title.toLowerCase()
            }).exec((err, postExist) => {
                if (err) {
                    reject(err);
                } else if (postExist) {
                    reject(['This title is already exist']);
                } else {
                    resolve(post);
                }
            })
        });
    }
    
    static checkBySlugExist(post) {
        return new Promise((resolve, reject) => {
            Post.findOne({
                slug: post.slug.toLowerCase()
            }).exec((err, postExist) => {
                if (err) {
                    reject(err);
                } else if (postExist) {
                    reject(['This slug is already exist']);
                } else {
                    resolve(post);
                }
            })
        });
    }

    static validateAndUploadPostImage(post) {
        return new Promise((resolve, reject) => {
            if (category.coverImage.constructor !== String) {
                FileHandler.checkFilesErrors(post.coverImage, 'image', 2)
                .then(FileHandler.moveFiles)
                .then((newImageName) => {
                    post.coverImage = newImageName;
                    resolve(post);
                })
                .catch(reject);
            } else {
                resolve(post);
            }
        });
    }

    static deletePost(id) {
        return new Promise((resolve, reject) => {
            Post.findByIdAndRemove(id, (err, res) => {
                if (err) {
                    reject(['This post is not exist']);
                } else {
                    resolve(res);
                }
            });
        });
    }

    static checkAndDeleteOldImage(post) {
        return new Promise((resolve, reject) => {
            if (post.existCoverImage != post.coverImage) {
                FileHandler.deleteFile(process.env.IMAGES_PATH + '/' + post.existCoverImage);
                resolve(post);
            } else {
                resolve(post);
            }
        });
    }
    
    static checkPostTitleExistUpdate(post) {
        return new Promise((resolve, reject) => {
            if (post.existPostTitle && post.title.toLowerCase() == post.existPostTitle) {
                resolve(post);
            } else {
                PostController.checkByTitleExist(post)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    static checkPostSlugExistUpdate(post) {
        return new Promise((resolve, reject) => {
            if (post.existPostSlug && post.slug.toLowerCase() == post.existPostSlug) {
                resolve(post);
            } else {
                PostController.checkBySlugExist(post)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    static checkPostImageExistUpdate(category) {
        return new Promise((resolve, reject) => {
            if (post.existPostCoverImage && !post.coverImage) {
                post.coverImage = post.existPostCoverImage;
                resolve(post);
            } else {
                resolve(post);
            }
        });
    }
}

module.exports = PostController;
