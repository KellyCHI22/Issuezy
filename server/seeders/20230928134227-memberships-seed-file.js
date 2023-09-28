'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User, Project } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const rootProject = await Project.findOne({
      where: {
        name: 'Issuezy',
      },
      raw: true,
    });
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkInsert(
      'Memberships',
      Array.from({ length: 3 }, (_, i) => ({
        user_id: users[i].id,
        project_id: rootProject.id,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memberships', {});
  },
};
