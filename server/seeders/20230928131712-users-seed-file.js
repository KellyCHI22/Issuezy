'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');

const seedPassword = process.env.SEED_PASSWORD;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Jessica',
          lastname: 'Chen',
          email: 'root@example.com',
          password: await bcrypt.hash(seedPassword, 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          firstname: 'Melody',
          lastname: 'Lin',
          email: 'user1@example.com',
          password: await bcrypt.hash(seedPassword, 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          firstname: 'Evelyn',
          lastname: 'Wang',
          email: 'user2@example.com',
          password: await bcrypt.hash(seedPassword, 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {});
  },
};
