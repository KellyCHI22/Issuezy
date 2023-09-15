const { Comment, Issue, Project, User } = require('../models');
const { customError } = require('../helpers/error-helper');

const commentService = {
  getComments: async (req, cb) => {
    try {
      // ? 檢查: 該 issue 是否屬於該 project/ 留言之 user 是否在這個 project 中
      const issueId = req.params.iid;
      const issue = await Issue.findByPk(issueId);
      if (!issue) throw customError(400, 'Issue does not exist!');

      const comments = await Comment.findAll({
        where: {
          issueId,
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
      // ? 檢查: 該 issue 是否屬於該 project/ 留言之 user 是否在這個 project 中
      const { text } = req.body;
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const userId = req.user.id;
      if (text.trim().length === 0) throw customError(400, 'Text is required!');
      if (text.trim().length > 250)
        throw customError(400, 'Text cannot be more than 250 words!');

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
};

module.exports = commentService;
