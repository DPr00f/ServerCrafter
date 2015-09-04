import Sequelize from 'sequelize';
import db from '../db';
import crypto from '../helpers/crypto';

export default db.define('server', {
  displayName: Sequelize.STRING(250),
  hostname: Sequelize.STRING(250),
  port: Sequelize.INTEGER(6),
  username: Sequelize.STRING(250),
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('password', val);
      this.setDataValue('passwordEncrypted', crypto.encrypt(val));
    }
  },
  privateKey: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('privateKey', val);
      this.setDataValue('privateKeyEncrypted', crypto.encrypt(val));
    }
  },
  passwordEncrypted: Sequelize.TEXT('medium'),
  privateKeyEncrypted: Sequelize.TEXT('long')
}, {
  timestamps: true
});
