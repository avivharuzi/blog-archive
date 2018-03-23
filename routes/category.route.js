const express = require('express');
const router = express.Router();

const CategoryController = require('./../controllers/category.controller');
const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    CategoryController.getCategories()
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 404, 'Categories not found'));
});

router.get('/highest/:numberOfCategories', (req, res) => {
    CategoryController.getCategoriesWithHighestPosts(+req.params.numberOfCategories)
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 409, 'There was problem by getting categories', err));
});

router.post('/', (req, res) => {
    CategoryController.validateCategory(req.body, req.files)
        .then(CategoryController.validateAndUploadCategoryImage)
        .then(CategoryController.saveCategory)
        .then((newCategory) => RouteHandler.success(res, 'New category added successfully', newCategory))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.put('/:id', (req, res) => {
    CategoryController.validateCategory(req.body, req.files, req.params.id)
        .then(CategoryController.validateAndUploadCategoryImage)
        .then(CategoryController.checkAndDeleteOldImage)
        .then(CategoryController.updateCategory)
        .then((updatedCategory) => RouteHandler.success(res, 'This category updated successfully', updatedCategory))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.delete('/:id', (req, res) => {
    CategoryController.checkCategoryForDelete(req.params.id)
        .then(CategoryController.deleteCategory)
        .then(CategoryController.deleteImage)
        .then((deletedCategory) => RouteHandler.success(res, 'This category deleted successfully', deletedCategory))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
