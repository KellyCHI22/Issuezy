const { Op } = require('sequelize');
const { User, Project, Membership, Category, Issue } = require('../models');
const { customError } = require('../helpers/error-helper');

const projectService = {
  getProjects: async (req, cb) => {
    // ! will add more constraints after?
    // ? problem retrieve private projects but not retrieving the list of members!
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
            attributes: ['id', 'title'],
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
    // todo will need to add issues
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
          attributes: ['id', 'name', 'description', 'creatorId', 'createdAt'],
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
          attributes: ['id', 'name'],
          raw: true,
        }),
      ]);
      if (!project) throw customError(400, 'Project does not exist!');
      cb(null, { project: { ...project.toJSON(), categories } });
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
    // todo will need to check if the current user is the project owner
    try {
      const { name, description, isPublic } = req.body;
      if (name.trim().length === 0 || description.trim().length === 0)
        throw customError(400, 'All fields are required!');
      const project = await Project.findByPk(req.params.id);
      if (!project) throw customError(400, 'Project does not exist!');
      const updatedProjected = await project.update({
        name,
        description,
        isPublic,
      });
      cb(null, { updatedProjected });
    } catch (err) {
      cb(err);
    }
  },
  deleteProject: async (req, cb) => {
    // todo will need to check if the current user is the project owner
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) throw customError(400, 'Project does not exist!');
      if (project.isDeleted)
        throw customError(400, 'Project has already been deleted!');
      const deletedProject = await project.update({ isDeleted: true });
      cb(null, { deletedProject });
    } catch (err) {
      cb(err);
    }
  },
  addMember: async (req, cb) => {
    try {
      // todo only project owner can add new members
      const userEmail = req.body.userEmail.trim();
      const projectId = parseInt(req.params.id);
      if (!userEmail) throw customError(400, 'Please enter user email!');

      // * check if project and user both exist
      const [project, user] = await Promise.all([
        Project.findByPk(projectId),
        User.findOne({ where: { email: userEmail } }),
      ]);
      if (!project) throw customError(400, 'Project does not exist!');
      if (!user) throw customError(400, 'User does not exist!');

      // * check if membership already exist
      const membership = await Membership.findOne({
        where: {
          projectId,
          userId: user.id,
        },
      });
      if (membership)
        throw customError(400, 'You already added this user to your project');

      // * create a new membership
      const newMembership = await Membership.create({
        userId: user.id,
        projectId,
      });
      cb(null, { membership: newMembership });
    } catch (err) {
      cb(err);
    }
  },
  removeMember: async (req, cb) => {
    try {
      // todo only project owner can remove members
      // todo cannot remove project owner
      const userId = parseInt(req.body.userId);
      const projectId = parseInt(req.params.id);
      if (!userId) throw customError(400, 'Bad request!');

      // * check if membership actually exist
      const membership = await Membership.findOne({
        where: {
          projectId,
          userId,
        },
      });
      if (!membership)
        throw customError(400, 'This membership has not been created yet');

      // * delete the membership
      const deletedMembership = await membership.destroy();
      cb(null, { deletedMembership });
    } catch (err) {
      cb(err);
    }
  },
};

module.exports = projectService;
