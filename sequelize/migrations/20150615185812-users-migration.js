
module.exports = {
  up: function (queryInterface, Sequelize) {
    'use strict';
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING(250),
        defaultValue: false,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(250),
        defaultValue: false,
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      engine: 'InnoDB',
      charset: 'utf8'
    });
  },

  down: function (queryInterface, Sequelize) {
    'use strict';
    return queryInterface.dropTable('users');
  }
};
