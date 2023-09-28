'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      ['bug', 'feature request', 'improvement', 'task', 'other'].map((item) => {
        return {
          name: item,
          project_id: null,
          is_default: true,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {});
  },
};
