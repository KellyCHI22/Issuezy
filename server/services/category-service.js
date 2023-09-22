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
    try {
      const { name } = req.body;
      const userId = req.user.id;
      const projectId = req.params.id;
      if (name.trim().length === 0) throw customError(400, 'Name is required!');

      const project = await Project.findByPk(projectId);
      if (!project) throw customError(400, 'Project does not exist!');

      // * only project owner can add category
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to add new categories!');

      const newCategory = await Category.create({ name, projectId });
      cb(null, { newCategory });
    } catch (err) {
      cb(err);
    }
  },
  patchCategory: async (req, cb) => {
    try {
      const { name } = req.body;
      const userId = req.user.id;
      if (name.trim().length === 0) throw customError(400, 'Name is required!');
      const projectId = req.params.id;
      const categoryId = req.params.cid;
      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);

      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');

      // * only project owner can edit category
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to edit categories!');

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
    try {
      const userId = req.user.id;
      const projectId = req.params.id;
      const categoryId = req.params.cid;
      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);

      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');

      // * only project owner can delete category
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to delete categories!');

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
