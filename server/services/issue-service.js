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
          {
            model: User,
            as: 'Reporter',
            attributes: ['id', 'firstname', 'lastname'],
          },
          {
            model: User,
            as: 'Assignee',
            attributes: ['id', 'firstname', 'lastname'],
          },
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
      // todo add input validations
      const { title, description, priority, categoryId } = req.body;
      const projectId = req.params.id;
      const reporterId = req.user.id;
      if (title.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');
      if (!['1', '2', '3'].includes(priority))
        throw customError(400, 'Priority can only be 1, 2 or 3!');

      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');

      const newIssue = await Issue.create({
        title,
        description,
        status: 'open',
        priority,
        categoryId,
        projectId,
        reporterId,
      });
      cb(null, { newIssue });
    } catch (err) {
      cb(err);
    }
  },
  patchIssue: async (req, cb) => {
    try {
      // todo add input validations
      // todo auth only certain people (?) can edit issues
      const { title, description, status, priority, categoryId } = req.body;
      const projectId = req.params.id;
      const issueId = req.params.iid;
      if (title.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');

      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);
      const issue = await Issue.findByPk(issueId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');

      const udpatedIssue = await issue.update({
        title,
        description,
        status,
        priority,
        categoryId,
      });
      cb(null, { udpatedIssue });
    } catch (err) {
      cb(err);
    }
  },
  deleteIssue: async (req, cb) => {
    try {
      // todo auth only certain people (?) can delete issues
      const projectId = req.params.id;
      const issueId = req.params.iid;

      const project = await Project.findByPk(projectId);
      const issue = await Issue.findByPk(issueId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');

      const deletedIssue = await issue.update({
        isDeleted: true,
      });
      cb(null, { deletedIssue });
    } catch (err) {
      cb(err);
    }
  },
  // todo assignIssue
  // todo update issue status
};

module.exports = issueService;
