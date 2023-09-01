const issueService = require('../services/issue-service');

const issueController = {
  getIssues: (req, res, next) => {
    issueService.getIssues(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  postIssue: (req, res, next) => {
    issueService.postIssue(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = issueController;
