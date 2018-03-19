const Category = require('./../models/category.model');

const ValidationHandler = require('./../handlers/validation.handler');
const FileHandler = require('./../handlers/file.handler');

class CategoryController {
    static getCategories() {
        return new Promise((resolve, reject) => {
            Category.find()
                .exec((err, categories) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(categories);
                    }
                });
        });
    }

    static saveCategory(category) {
        return new Promise((resolve, reject) => {
            Category.create({
                name: category.name,
                image: category.image,
                posts: []
            }, (err, newCategory) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(newCategory);
                }
            });
        });
    }

    static updateCategory(category) {
        return new Promise((resolve, reject) => {
            Category.findByIdAndUpdate(category.id, {
                name: category.name,
                image: category.image
            }, (err, updatedCategory) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedCategory);
                }
            });
        });
    }

    static validateCategory(category, files, categoryId = null) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (files && files.image) {
                category.image = files.image;
            }
    
            if (ValidationHandler.regex(category.name, /^[A-Za-z0-9 ]{2,55}$/)) {
                category.name = ValidationHandler.testInput(category.name);
            } else {
                errors.push('Category name is invalid');
            }
    
            if (errors.length) {
                reject(errors);
            } else if (!categoryId) {
                CategoryController.checkCategoryName(category)
                    .then((category) => resolve(category))
                    .catch((err) => reject(err));
            } else {
                category.id = categoryId;

                CategoryController.checkCategoryNameExistUpdate(category)
                    .then(CategoryController.checkCategoryImageExistUpdate)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    static checkCategoryName(category) {
        return new Promise((resolve, reject) => {
            Category.findOne({
                name: category.name.toLowerCase()
            }).exec((err, categoryExist) => {
                if (err) {
                    reject(err);
                } else if (categoryExist) {
                    reject(['This category name is already exist']);
                } else {
                    resolve(category);
                }
            })
        });
    }

    static validateAndUploadCategoryImage(category) {
        return new Promise((resolve, reject) => {
            if (category.image.constructor !== String) {
                FileHandler.checkFilesErrors(category.image, 'image', 2)
                .then(FileHandler.moveFiles)
                .then((newImageName) => {
                    category.image = newImageName;
                    resolve(category);
                })
                .catch((err) => reject(err));
            } else if (category.image == 'null' || category.image == 'undefined') {
                category.image = process.env.DEFAULT_CATEGORY_IMAGE;
                resolve(category);  
            } else {
                resolve(category);
            }
        });
    }

    static checkCategoryNameExistUpdate(category) {
        return new Promise((resolve, reject) => {
            if (category.existCategoryName && category.name.toLowerCase() === category.existCategoryName) {
                resolve(category);
            } else {
                CategoryController.checkCategoryName(category)
                    .then((category) => resolve(category))
                    .catch((err) => reject(err));
            }
        });
    }

    static checkCategoryImageExistUpdate(category) {
        return new Promise((resolve, reject) => {
            if (category.existCategoryImage && !category.image) {
                category.image = category.existCategoryImage;
                resolve(category);
            } else {
                resolve(category);
            }
        });
    }

    static checkCategoryByIdFromPost(post) {
        return new Promise((resolve, reject) => {
            Category.findById(post.category)
                .exec((err, categoryExist) => {
                    if (err) {
                        reject(err);
                    } else if (categoryExist) {
                        resolve(post);
                    } else {
                        reject(['This category doesnt exist']);
                    }
                });
        });
    }

    static addPostToCategory(post) {
        return new Promise((resolve, reject) => {
            Category.findByIdAndUpdate(post.category, {
                $push: {
                    posts: post._id
                }
            }, (err, updatedCategory) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(post);
                }
            });
        });
    }

    static removePostFromCategory(post) {
        return new Promise((resolve, reject) => {
            Category.update(
                {
                    _id: post.category 
                },
                {
                    $pull: { posts: post._id }
                },
                {
                    multi: true
                }
            ).exec((err, updatedCategory) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = CategoryController;
