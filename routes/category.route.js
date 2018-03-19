const express = require('express');
const router = express.Router();

const CategoryController = require('./../controllers/category.controller');
const RouteHandler = require('./../handlers/route.handler');

router.get('/', (req, res) => {
    CategoryController.getCategories()
        .then((categories) => res.send(categories))
        .catch((err) => RouteHandler.error(res, 404, 'Categories not found'));
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
        .then((updateCategory) => RouteHandler.success(res, 'This category updated successfully', updateCategory))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
