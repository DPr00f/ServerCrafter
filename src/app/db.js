import Sequelize from 'sequelize';
import config from '../config';
import '../log';

export default new Sequelize(config.DB, {
  logging: console.mysql
});
