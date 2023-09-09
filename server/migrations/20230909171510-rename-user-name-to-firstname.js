'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'name', 'firstname');
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'firstname', 'name');
  },
};
