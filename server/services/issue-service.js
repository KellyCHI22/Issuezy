const { Issue, Category, User, Project, Membership } = require('../models');
const { customError } = require('../helpers/error-helper');

const issueService = {
  getIssues: async (req, cb) => {
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
            attributes: ['id', 'name', 'isDeleted'],
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
          'projectId',
          'createdAt',
          'updatedAt',
        ],
      });
      cb(null, { issues });
    } catch (err) {
      cb(err);
    }
  },
  getIssue: async (req, cb) => {
    try {
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const project = await Project.findByPk(projectId);
      if (!project) throw customError(400, 'Project does not exist!');

      const issue = await Issue.findByPk(issueId, {
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
            attributes: ['id', 'name', 'isDeleted'],
          },
        ],
        attributes: [
          'id',
          'title',
          'description',
          'status',
          'priority',
          'categoryId',
          'reporterId',
          'assigneeId',
          'projectId',
          'createdAt',
          'updatedAt',
        ],
      });
      if (!issue) throw customError(400, 'Issue does not exist!');
      cb(null, { issue });
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
      const { title, description, status, priority, categoryId } = req.body;
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const userId = req.user.id;
      if (title.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');

      const project = await Project.findByPk(projectId);
      const category = await Category.findByPk(categoryId);
      const issue = await Issue.findByPk(issueId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!category) throw customError(400, 'Category does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');

      // * 只有 project owner, issue 作者和 issue assignee 可以編輯 issue
      if (
        ![issue.reporterId, issue.assigneeId, project.creatorId].includes(
          userId
        )
      )
        throw customError(400, 'You are not allowed to edit the issue!');

      const updatedIssue = await issue.update({
        title,
        description,
        status,
        priority,
        categoryId,
      });
      cb(null, { updatedIssue });
    } catch (err) {
      cb(err);
    }
  },
  deleteIssue: async (req, cb) => {
    try {
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const userId = req.user.id;

      const project = await Project.findByPk(projectId);
      const issue = await Issue.findByPk(issueId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');

      // * 只有 project owner, issue 作者和 issue assignee 可以刪除 issue
      if (
        ![issue.reporterId, issue.assigneeId, project.creatorId].includes(
          userId
        )
      )
        throw customError(400, 'You are not allowed to delete the issue!');

      const deletedIssue = await issue.update({
        isDeleted: true,
      });
      cb(null, { deletedIssue });
    } catch (err) {
      cb(err);
    }
  },
  assignIssue: async (req, cb) => {
    try {
      const { assigneeId } = req.body;
      const projectId = req.params.id;
      const issueId = req.params.iid;
      const userId = req.user.id;
      if (!assigneeId) throw customError(400, 'Assignee is required!');

      const project = await Project.findByPk(projectId);
      const issue = await Issue.findByPk(issueId);
      const assignee = await User.findByPk(assigneeId);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!issue) throw customError(400, 'Issue does not exist!');
      if (!assignee) throw customError(400, 'Assigned user does not exist!');

      const isUserMember = await Membership.findOne({
        where: { userId, projectId },
      });
      const isAssigneeMember = await Membership.findOne({
        where: { userId: assigneeId, projectId },
      });

      // * 只有 project members 可以 assign 和被 assign
      if (!isUserMember || !isAssigneeMember)
        throw customError(
          400,
          'Only project members can assign issues or be assigned'
        );

      const updatedIssue = await issue.update({
        assigneeId,
      });
      cb(null, { updatedIssue });
    } catch (err) {
      cb(err);
    }
  },
  // todo update issue status
};

module.exports = issueService;
