const categoryService = require('../services/category-service');

const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = categoryController;
