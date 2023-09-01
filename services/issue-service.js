const { Issue, Category, User, Project } = require('../models');
const { customError } = require('../helpers/error-helper');

const issueService = {
  getIssues: async (req, cb) => {
    // todo allow different sorting options
    try {
      const projectId = req.params.id;
      const project = await Project.findByPk(projectId);
      if (!project) throw customError(400, 'Project does not exist!');

      const issues = await Issue.findAll({
        where: { projectId, isDeleted: false },
        include: [
          { model: User, as: 'Reporter', attributes: ['id', 'name'] },
          { model: User, as: 'Assignee', attributes: ['id', 'name'] },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
        ],
        order: [['createdAt', 'DESC']],
        attributes: [
          'id',
          'title',
          'description',
          'status',
          'priority',
          'categoryId',
          'reporterId',
          'assigneeId',
          'createdAt',
          'updatedAt',
        ],
      });
      cb(null, { issues });
    } catch (err) {
      cb(err);
    }
  },
  postIssue: async (req, cb) => {
    try {
      // ? assignee id is optional?
      // todo add input validations
      const { title, description, status, priority, categoryId, assigneeId } =
        req.body;
      const projectId = req.params.id;
      const reporterId = req.user.id;
      if (title.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');

      const category = await Category.findByPk(categoryId);
      const assignedUser = await User.findByPk(assigneeId);
      if (!category) throw customError(400, 'Category does not exist!');
      if (!assignedUser) throw customError(400, 'Assigned user not exist!');

      const newIssue = await Issue.create({
        title,
        description,
        status,
        priority,
        categoryId,
        projectId,
        reporterId,
        assigneeId,
      });
      cb(null, { newIssue });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = issueService;
