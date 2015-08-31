import indexController from './controllers/index.server';
import serversController from './controllers/servers.server';
import loginController from './controllers/login.server';
import logoutController from './controllers/logout.server';
import passport from 'passport';

export default [
  {
    route: '/',
    type: 'GET',
    func: indexController.render.bind(indexController)
  },
  {
    route: '/servers',
    type: 'GET',
    func: serversController.render.bind(serversController)
  },
  {
    route: '/servers/add',
    type: 'GET',
    func: serversController.render.bind(serversController)
  },
  {
    route: '/login',
    type: 'POST',
    func: loginController.login.bind(loginController)
  },
  {
    route: '/logout',
    type: 'GET',
    func: logoutController.logout
  }
];
