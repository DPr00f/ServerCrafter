import Sequelize from 'sequelize';
import db from '../db';
import passwordHash from 'password-hash';

export default db.define('user', {
  username: Sequelize.STRING(40),
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('password', val);
      this.setDataValue('password_hash', passwordHash.generate(val));
    }
  },
  password_hash: Sequelize.STRING(250),
  admin: Sequelize.BOOLEAN,
  email: Sequelize.STRING(250)
}, {
  timestamps: true
});
