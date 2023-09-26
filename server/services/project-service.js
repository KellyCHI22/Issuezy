const { Op } = require('sequelize');
const { User, Project, Membership, Category, Issue } = require('../models');
const { customError } = require('../helpers/error-helper');

const projectService = {
  getProjects: async (req, cb) => {
    try {
      const userId = req.user.id;
      // * users can see all public projects AND private projects they are a member of
      const memberships = await Membership.findAll({ where: { userId } });
      const participatedProjects = memberships.map(
        (membership) => membership.projectId
      );
      const projects = await Project.findAll({
        where: {
          [Op.or]: [
            {
              isPublic: true, // Public projects
              isDeleted: false, // Not deleted projects
            },
            {
              id: participatedProjects,
              isPublic: false, // Private projects
              isDeleted: false, // Not deleted projects
            },
          ],
        },
        include: [
          {
            model: User,
            as: 'Creator',
            attributes: ['id', 'firstname', 'lastname'],
          },
          {
            model: User,
            as: 'Members',
            attributes: ['id', 'firstname', 'lastname'],
            through: { attributes: [] },
          },
          {
            model: Issue,
            attributes: ['id', 'title', 'isDeleted'],
          },
        ],
        order: [['createdAt', 'DESC']],
        attributes: [
          'id',
          'name',
          'description',
          'creatorId',
          'isPublic',
          'createdAt',
        ],
        nest: true,
      });
      cb(null, { projects });
    } catch (err) {
      cb(err);
    }
  },
  getProject: async (req, cb) => {
    try {
      const [project, categories] = await Promise.all([
        Project.findByPk(req.params.id, {
          include: [
            {
              model: User,
              as: 'Creator',
              attributes: ['id', 'firstname', 'lastname'],
            },
            {
              model: User,
              as: 'Members',
              attributes: ['id', 'firstname', 'lastname'],
              through: { attributes: [] },
            },
          ],
          order: [['createdAt', 'DESC']],
          attributes: [
            'id',
            'name',
            'description',
            'isPublic',
            'creatorId',
            'createdAt',
          ],
          nest: true,
        }),
        Category.findAll({
          where: {
            [Op.or]: [
              {
                isDefault: true,
                isDeleted: false,
              },
              {
                isDefault: false,
                isDeleted: false,
                projectId: req.params.id,
              },
            ],
          },
          attributes: ['id', 'name', 'isDefault'],
          raw: true,
        }),
      ]);
      const formattedCategories = categories.map((category) => {
        return {
          ...category,
          isDefault: category.isDefault ? true : false,
        };
      });
      if (!project) throw customError(400, 'Project does not exist!');
      cb(null, {
        project: { ...project.toJSON(), categories: formattedCategories },
      });
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
      // * create a new membership when add a new project
      await Membership.create({ userId: creatorId, projectId: newProject.id });
      cb(null, { newProject });
    } catch (err) {
      cb(err);
    }
  },
  patchProject: async (req, cb) => {
    try {
      const { name, description, isPublic } = req.body;
      const userId = req.user.id;
      if (name.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');
      const project = await Project.findByPk(req.params.id);
      if (!project) throw customError(400, 'Project does not exist!');

      // * only project owner can update the project he created
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to edit the project!');

      const updatedProject = await project.update({
        name,
        description,
        isPublic,
      });
      cb(null, { updatedProject });
    } catch (err) {
      cb(err);
    }
  },
  deleteProject: async (req, cb) => {
    try {
      const userId = req.user.id;
      const project = await Project.findByPk(req.params.id);
      if (!project) throw customError(400, 'Project does not exist!');

      // * only project owner can delete the project he created
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to delete the project!');

      if (project.isDeleted)
        throw customError(400, 'Project has already been deleted!');

      const deletedProject = await project.update({ isDeleted: true });
      cb(null, { deletedProject });
    } catch (err) {
      cb(err);
    }
  },
  getMembers: async (req, cb) => {
    try {
      const project = await Project.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'Creator',
            attributes: ['id', 'firstname', 'lastname', 'email'],
          },
          {
            model: User,
            as: 'Members',
            attributes: ['id', 'firstname', 'lastname', 'email'],
            through: { attributes: [] },
          },
        ],
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name'],
        nest: true,
      });
      if (!project) throw customError(400, 'Project does not exist!');
      const filteredMembers = project.Members.filter(
        (member) => member.id !== project.Creator.id
      );

      cb(null, { project: { ...project.toJSON(), Members: filteredMembers } });
    } catch (err) {
      cb(err);
    }
  },
  addMember: async (req, cb) => {
    try {
      const email = req.body.email.trim();
      const projectId = parseInt(req.params.id);
      const userId = req.user.id;
      if (!email) throw customError(400, 'Please enter user email!');

      // * check if project and user both exist
      const [project, member] = await Promise.all([
        Project.findByPk(projectId),
        User.findOne({ where: { email } }),
      ]);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!member) throw customError(400, 'This user does not exist!');

      // * only project owner can add new members
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to add new members!');

      // * check if membership already exist
      const membership = await Membership.findOne({
        where: {
          projectId,
          userId: member.id,
        },
      });
      if (membership)
        throw customError(400, 'This user is already a member of the project');

      // * create a new membership
      const newMembership = await Membership.create({
        userId: member.id,
        projectId,
      });
      cb(null, { membership: newMembership });
    } catch (err) {
      cb(err);
    }
  },
  removeMember: async (req, cb) => {
    try {
      const memberId = parseInt(req.params.uid);
      const projectId = parseInt(req.params.id);
      const userId = req.user.id;
      if (!memberId) throw customError(400, 'Please select a user!');

      const project = await Project.findByPk(req.params.id);

      // * only project owner can remove members
      if (userId !== project.creatorId)
        throw customError(400, 'You are not allowed to remove members!');

      // * project creator cannot be removed
      if (memberId === project.creatorId)
        throw customError(400, 'You are not allowed to remove the creator!');

      // * check if membership actually exist
      const membership = await Membership.findOne({
        where: {
          projectId,
          userId: memberId,
        },
      });
      if (!membership)
        throw customError(400, 'This membership has not been created yet');

      // * delete the membership
      const deletedMembership = await membership.destroy();

      // * all issues that are assigned to this member will be back to null
      await Issue.update(
        { assigneeId: null },
        {
          where: {
            assigneeId: memberId,
          },
        }
      );

      cb(null, { deletedMembership });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = projectService;
