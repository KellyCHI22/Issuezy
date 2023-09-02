const categoryService = require('../services/category-service');

const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  postCategory: (req, res, next) => {
    categoryService.postCategory(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  patchCategory: (req, res, next) => {
    categoryService.patchCategory(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  deleteCategory: (req, res, next) => {
    categoryService.deleteCategory(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = categoryController;
