'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const rootUser = await User.findOne({
      where: {
        email: 'root@example.com',
      },
      raw: true,
    });
    await queryInterface.bulkInsert('Projects', [
      {
        name: 'Issuezy',
        description:
          'Issues made easy. Managing your issues with team members is no longer a pain!',
        creator_id: rootUser.id,
        is_public: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', {});
  },
};
