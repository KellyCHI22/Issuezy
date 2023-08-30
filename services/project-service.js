const { User, Project } = require('../models');
const { customError } = require('../helpers/error-helper');

const projectService = {
  getProjects: async (req, cb) => {
    // ! will add more constraints after?
    try {
      const projects = await Project.findAll({
        where: {
          isPublic: true, // only get public projects
          isDeleted: false, // only get not deleted projects
        },
        include: [{ model: User, as: 'Creator', attributes: ['id', 'name'] }],
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'description', 'creatorId', 'createdAt'],
        raw: true,
        nest: true,
      });
      cb(null, { projects });
    } catch (err) {
      cb(err);
    }
  },
  postProject: async (req, cb) => {
    try {
      const { name, description, isPublic } = req.body;
      const creatorId = req.user.id;
      if (name.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');
      const newProject = await Project.create({
        name,
        description,
        isPublic,
        creatorId,
      });
      cb(null, { newProject });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = projectService;
