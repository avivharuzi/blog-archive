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

    static getTags() {
        function arrayUnique(array) {
            let a = array.concat();
            for (let i = 0; i < a.length; ++i) {
                for (let j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j]) {
                        a.splice(j--, 1);
                    }
                }
            }
            return a;
        }

        return new Promise((resolve, reject) => {
            PostController.getPosts()
                .then((posts) => {
                    let tags = [];
                    for (let post of posts) {
                        tags = arrayUnique(tags.concat(post.tags));
                    }
                    resolve(tags)
                })
                .catch((err) => reject(err));
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
            }).populate('category').exec((err, updatedPost) => {
                if (err) {
                    reject(err);
                } else {
                    updatedPost.body = ValidationHandler.decodeHtml(post.body);
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
            } else if (!postId) {
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
            } else if (postId) {
                post.id = postId;

                CategoryController.checkCategoryByIdFromPost(post)
                    .then(PostController.checkPostTitleExistUpdate)
                    .then(PostController.checkPostSlugExistUpdate)
                    .then(PostController.checkPostImageExistUpdate)
                    .then((post) => resolve(post))
                    .catch((reject) => reject(err));
            } else {
                CategoryController.checkCategoryByIdFromPost(post)
                    .then(PostController.checkByTitleExist)
                    .then(PostController.checkBySlugExist)
                    .then((post) => resolve(post))
                    .catch((reject) => reject(err));
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
            if (post.coverImage.constructor !== String) {
                FileHandler.checkFilesErrors(post.coverImage, 'image', 2)
                .then(FileHandler.moveFiles)
                .then((newImageName) => {
                    post.coverImage = newImageName;
                    resolve(post);
                })
                .catch((err) => reject(err));
            } else {
                resolve(post);
            }
        });
    }

    static deletePost(id) {
        return new Promise((resolve, reject) => {
            Post.findByIdAndRemove(id, (err, deletedPost) => {
                if (err) {
                    reject(['This post is not exist']);
                } else {
                    resolve(deletedPost);
                }
            });
        });
    }

    static checkAndDeleteOldImage(post) {
        return new Promise((resolve, reject) => {
            if (post.existPostCoverImage != post.coverImage) {
                FileHandler.deleteFile(process.env.IMAGES_PATH + '/' + post.existPostCoverImage);;
                resolve(post);
            } else {
                resolve(post);
            }
        });
    }

    static deleteImage(post) {
        return new Promise((resolve, reject) => {
            FileHandler.deleteFile(process.env.IMAGES_PATH + '/' + post.coverImage);;
            resolve(post);
        });  
    }
    
    static checkPostTitleExistUpdate(post) {
        return new Promise((resolve, reject) => {
            if (post.existPostTitle && post.title.toLowerCase() == post.existPostTitle) {
                resolve(post);
            } else {
                PostController.checkByTitleExist(post)
                    .then((post) => resolve(post))
                    .catch((err) => reject(err))
            }
        });
    }

    static checkPostSlugExistUpdate(post) {
        return new Promise((resolve, reject) => {
            if (post.existPostSlug && post.slug.toLowerCase() == post.existPostSlug) {
                resolve(post);
            } else {
                PostController.checkBySlugExist(post)
                    .then((post) => resolve(post))
                    .catch((err) => reject(err));
            }
        });
    }

    static checkPostImageExistUpdate(post) {
        return new Promise((resolve, reject) => {
            if (post.coverImage == 'null' || post.coverImage == 'undefined') {
                post.coverImage = post.existPostCoverImage;
                resolve(post);
            } else {
                resolve(post);
            }
        });
    }
}

module.exports = PostController;
