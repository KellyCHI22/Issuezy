'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: 'open',
        type: Sequelize.STRING,
      },
      priority: {
        allowNull: false,
        defaultValue: 1, // 1 > high, 2 > medium, 3 > low
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      project_id: {
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      reporter_id: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      assignee_id: {
        references: {
          model: 'Users',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      is_deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Issues');
  },
};
