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
        attributes: ['id', 'name'],
      });
      cb(null, { categories });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = categoryService;
