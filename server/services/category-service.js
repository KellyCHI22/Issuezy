const { Op } = require('sequelize');
const { Category, Project } = require('../models');
const { customError } = require('../helpers/error-helper');

const categoryService = {
  getCategories: async (req, cb) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findByPk(projectId);
      if (!project) throw customError(400, 'Project does not exist!');
      const categories = await Category.findAll({
        where: {
          [Op.or]: [
            {
              isDefault: true,
              isDeleted: false,
            },
            {
              isDefault: false,
              isDeleted: false,
              projectId,
            },
          ],
        },
        attributes: ['id', 'name', 'isDefault', 'isDeleted'],
      });
      cb(null, { categories });
    } catch (err) {
      cb(err);
    }
  },
  postCategory: async (req, cb) => {
    // todo only project owner can add category
    try {
      const { name } = req.body;
      if (name.trim().length === 0) throw customError(400, 'Name is required!');
      const projectId = req.params.id;
      const project = await Project.findByPk(projectId);
      if (!project) throw customError(400, 'Project does not exist!');
      const newCategory = await Category.create({ name, projectId });
      cb(null, { newCategory });
    } catch (err) {
      cb(err);
    }
  },
  patchCategory: async (req, cb) => {
    // todo only project owner can edit category
    try {
      const { name } = req.body;
      if (name.trim().length === 0) throw customError(400, 'Name is required!');
      const projectId = req.params.id;
      const categoryId = req.params.cid;
      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);

      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');
      if (category.isDefault)
        throw customError(400, 'Cannot change default categories!');
      if (category.projectId !== parseInt(projectId))
        throw customError(400, 'Cannot change categories of other projects!');

      const updatedCategory = await category.update({ name });
      cb(null, { updatedCategory });
    } catch (err) {
      cb(err);
    }
  },
  deleteCategory: async (req, cb) => {
    // todo only project owner can delete category
    try {
      const projectId = req.params.id;
      const categoryId = req.params.cid;
      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);

      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');
      if (category.isDefault)
        throw customError(400, 'Cannot delete default categories!');
      if (category.isDeleted)
        throw customError(400, 'Category has already been deleted!');
      if (category.projectId !== parseInt(projectId))
        throw customError(400, 'Cannot delete categories of other projects!');

      const deletedCategory = await category.update({ isDeleted: true });
      cb(null, { deletedCategory });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = categoryService;
