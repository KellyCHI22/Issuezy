const projectService = require('../services/project-service');

const projectController = {
  getProjects: (req, res, next) => {
    projectService.getProjects(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  getProject: (req, res, next) => {
    projectService.getProject(req, (err, data) => {
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
  patchProject: (req, res, next) => {
    projectService.patchProject(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  deleteProject: (req, res, next) => {
    projectService.deleteProject(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  addMember: (req, res, next) => {
    projectService.addMember(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  removeMember: (req, res, next) => {
    projectService.removeMember(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = projectController;
