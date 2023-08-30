const { Op } = require('sequelize');
const { User, Project, Membership } = require('../models');
const { customError } = require('../helpers/error-helper');

const projectService = {
  getProjects: async (req, cb) => {
    // ! will add more constraints after?
    try {
      const userId = req.user.id;
      // * users can see all public projects AND private projects they are a member of
      const projects = await Project.findAll({
        where: {
          [Op.or]: [
            {
              isPublic: true, // Public projects
              isDeleted: false, // Not deleted projects
            },
            {
              isPublic: false, // Private projects
              isDeleted: false, // Not deleted projects
              '$Members.id$': userId, // * Logged-in user is a member
            },
          ],
        },
        include: [
          { model: User, as: 'Creator', attributes: ['id', 'name'] },
          {
            model: User,
            as: 'Members',
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'description', 'creatorId', 'createdAt'],
        nest: true,
      });
      cb(null, { projects });
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
};

module.exports = projectService;
