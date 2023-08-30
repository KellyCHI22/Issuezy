const projectService = require('../services/project-service');

const projectController = {
  getProjects: (req, res, next) => {
    projectService.getProjects(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  postProject: (req, res, next) => {
    projectService.postProject(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = projectController;
