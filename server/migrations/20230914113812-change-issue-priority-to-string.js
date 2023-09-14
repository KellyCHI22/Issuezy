'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Issues', 'priority', {
      type: Sequelize.STRING,
      defaultValue: '1',
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Issues', 'priority', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    });
  },
};
