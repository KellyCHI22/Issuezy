const { Comment, Issue, Project, User } = require('../models');
const { customError } = require('../helpers/error-helper');

const commentService = {
  getComments: async (req, cb) => {
    try {
      // ? 檢查: 該 issue 是否屬於該 project
      const issueId = req.params.iid;
      const issue = await Issue.findByPk(issueId);
      if (!issue) throw customError(400, 'Issue does not exist!');

      const comments = await Comment.findAll({
        where: {
          issueId,
          // only get undeleted comments
          isDeleted: false,
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'firstname', 'lastname'],
          },
        ],
      });
      cb(null, { comments });
    } catch (err) {
      cb(err);
    }
  },
  postComment: async (req, cb) => {
    try {
      // todo add input validations
      // ? 檢查: 該 issue 是否屬於該 project
      const { text } = req.body;
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const userId = req.user.id;
      if (text.trim().length === 0)
        throw customError(400, 'Comment is required!');
      if (text.trim().length > 250)
        throw customError(400, 'Comment cannot be more than 250 words!');

      const project = await Project.findByPk(projectId);
      const issue = await Issue.findByPk(issueId);
      if (!project) throw customError(400, 'project does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');

      const newComment = await Comment.create({
        text,
        issueId,
        userId,
      });
      cb(null, { newComment });
    } catch (err) {
      cb(err);
    }
  },
  patchComment: async (req, cb) => {
    try {
      const { text } = req.body;
      const projectId = req.params.id;
      const commentId = req.params.cid;
      const userId = req.user.id;
      if (text.trim().length === 0) throw customError(400, 'Text is required!');
      if (text.trim().length > 250)
        throw customError(400, 'Text cannot be more than 250 words!');

      const project = await Project.findByPk(projectId);
      const comment = await Comment.findByPk(commentId);
      if (!project) throw customError(400, 'project does not exist!');
      if (!comment) throw customError(400, 'Comment does not exist!');

      // * 只有 project owner 和 comment 作者本人可以編輯留言
      if (![comment.userId, project.creatorId].includes(userId))
        throw customError(400, 'You are not allowed to edit the comment!');

      const updatedComment = await comment.update({
        text,
      });
      cb(null, { updatedComment });
    } catch (err) {
      cb(err);
    }
  },
  deleteComment: async (req, cb) => {
    try {
      const projectId = req.params.id;
      const commentId = req.params.cid;
      const userId = req.user.id;

      const project = await Project.findByPk(projectId);
      const comment = await Comment.findByPk(commentId);
      if (!project) throw customError(400, 'project does not exist!');
      if (!comment) throw customError(400, 'Comment does not exist!');

      if (comment.isDeleted)
        throw customError(400, 'Comment has already been deleted!');

      // * 只有 project owner 和 comment 作者本人可以刪除留言
      if (![comment.userId, project.creatorId].includes(userId))
        throw customError(400, 'You are not allowed to delete the comment!');

      const deletedComment = await comment.update({ isDeleted: true });
      cb(null, { deletedComment });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = commentService;
