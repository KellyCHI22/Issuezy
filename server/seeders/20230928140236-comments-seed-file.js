/* eslint-disable quotes */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const SEED_COMMENTS = [
      {
        text: "I don't know what causes this issue!",
      },
      {
        text: 'I have tested the mobile app on my phone, and it works perfectly!',
      },
      {
        text: 'The payment gateway integration seems to be secure and reliable.',
      },
      {
        text: 'I noticed that the search functionality is much faster now. Great job!',
      },
      {
        text: 'I provided some feedback on the user feedback form. Hope it helps!',
      },
      {
        text: "Security is a top priority. Let's make sure we address all vulnerabilities.",
      },
      {
        text: 'I encountered an issue during registration. It needs attention.',
      },
      {
        text: 'I think we should improve the UI of the mobile app.',
      },
      {
        text: 'The payment process is smooth, but we could add more payment options.',
      },
      {
        text: 'The search results are quite accurate now. Impressive!',
      },
      {
        text: "I'm glad we have a feedback mechanism in place. It shows that we value our users.",
      },
      {
        text: "Security is a concern. Let's perform a thorough assessment.",
      },
      {
        text: 'I have some suggestions for the registration process.',
      },
      {
        text: 'The mobile app looks great on my tablet as well.',
      },
      {
        text: 'We should consider adding support for international payment methods.',
      },
      {
        text: 'The search feature is a game-changer for our platform.',
      },
      {
        text: 'I appreciate the feedback collection. It helps us improve.',
      },
      {
        text: "Let's schedule a security assessment soon.",
      },
      {
        text: 'I found a minor bug during registration.',
      },
      {
        text: 'I have some design ideas for the mobile app.',
      },
      {
        text: 'The payment gateway is reliable and secure.',
      },
      {
        text: 'The search functionality is lightning fast now.',
      },
      {
        text: 'User feedback is invaluable for making enhancements.',
      },
      {
        text: 'Security should always be a top priority.',
      },
      {
        text: 'The registration process could be more user-friendly.',
      },
      {
        text: "I tested the app on various devices, and it's responsive.",
      },
      {
        text: 'The payment experience is hassle-free.',
      },
      {
        text: 'The search results are spot-on.',
      },
      {
        text: 'I submitted some feedback. Looking forward to improvements.',
      },
      {
        text: "Security checks are crucial. Let's not skip them.",
      },
    ];
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const issues = await queryInterface.sequelize.query(
      'SELECT id FROM Issues;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkInsert(
      'Comments',
      SEED_COMMENTS.map((comment) => {
        return {
          text: comment.text,
          issue_id: issues[Math.floor(Math.random() * issues.length)].id,
          user_id: users[Math.floor(Math.random() * users.length)].id,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', {});
  },
};
