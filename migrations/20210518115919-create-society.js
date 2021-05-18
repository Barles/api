'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Societies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      users_id: {
        type: Sequelize.JSON
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Societies');
  }
};
