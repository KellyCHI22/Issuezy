const commentService = require('../services/comment-service');

const commentController = {
  getComments: (req, res, next) => {
    commentService.getComments(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  postComment: (req, res, next) => {
    commentService.postComment(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  patchComment: (req, res, next) => {
    commentService.patchComment(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
  deleteComment: (req, res, next) => {
    commentService.deleteComment(req, (err, data) => {
      if (err) return next(err);
      res.json({ status: 'success', data });
    });
  },
};

module.exports = commentController;
