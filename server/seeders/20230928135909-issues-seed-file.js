'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Project } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const SEED_ISSUES = [
      {
        title: 'User Registration Flow Enhancement',
        description:
          'Improve the user registration process to include email verification and password strength checks.',
      },
      {
        title: 'Payment Gateway Integration',
        description:
          'Integrate a secure payment gateway to facilitate online transactions in the e-commerce platform.',
      },
      {
        title: 'Search Functionality Optimization',
        description:
          'Optimize the search functionality to provide faster and more relevant search results to users.',
      },
      {
        title: 'User Feedback Collection',
        description:
          'Implement a user feedback mechanism to gather valuable insights for product improvement.',
      },
      {
        title: 'Security Vulnerability Assessment',
        description:
          'Perform a comprehensive security assessment to identify and address vulnerabilities in the application.',
      },
      {
        title: 'Login Page Redesign',
        description:
          'Redesign the login page to improve user experience and modernize the design.',
      },
      {
        title: 'Database Connection Error',
        description:
          'Investigate and resolve intermittent database connection issues that affect application performance.',
      },
      {
        title: 'Responsive Layout Fixes',
        description:
          'Ensure the website layout adapts correctly to various screen sizes and devices.',
      },
      {
        title: 'Bug in User Profile Page',
        description:
          'Fix a bug on the user profile page where some information is not displayed correctly.',
      },
      {
        title: 'Performance Optimization',
        description:
          'Identify and address bottlenecks to improve page load times and overall system performance.',
      },
    ];
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const rootProject = await Project.findOne({
      where: {
        name: 'Issuezy',
      },
      raw: true,
    });
    await queryInterface.bulkInsert(
      'Issues',
      SEED_ISSUES.map((issue) => {
        return {
          title: issue.title,
          description: issue.description,
          status: 'open',
          priority: Math.floor(Math.random() * 3) + 1,
          category_id:
            categories[Math.floor(Math.random() * categories.length)].id,
          project_id: rootProject.id,
          reporter_id: users[Math.floor(Math.random() * users.length)].id,
          assignee_id: users[Math.floor(Math.random() * users.length)].id,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Issues', {});
  },
};
