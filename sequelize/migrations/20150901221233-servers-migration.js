
module.exports = {
  up: function (queryInterface, Sequelize) {
    'use strict';
    return queryInterface.createTable('servers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      displayName: {
        type: Sequelize.STRING(250),
        unique: true,
        allowNull: false
      },
      hostname: {
        type: Sequelize.STRING(250),
        defaultValue: false,
        allowNull: false
      },
      port: {
        type: Sequelize.INTEGER(6),
        defaultValue: false,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(250),
        defaultValue: false,
        allowNull: true
      },
      passwordEncrypted: {
        type: Sequelize.TEXT('medium'),
        defaultValue: null,
        allowNull: true
      },
      privateKeyEncrypted: {
        type: Sequelize.TEXT('long'),
        defaultValue: null,
        allowNull: true
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
    return queryInterface.dropTable('servers');
  }
};
