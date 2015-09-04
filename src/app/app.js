import express from 'express';
import favicon from 'serve-favicon';
import renderer from 'react-engine';
import { join as pathJoin } from 'path';
import RoutesController from './controllers/routes.server';
import routesList from './routes';
import config from '../config';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import SocketIOConnection from './socket.io.connection';
import GlobalsMiddleware from './middlewares/globals.server';
import '../log';

import User from './models/user';

class Application {

  constructor() {
    this.app = express();
    this.routes = new RoutesController(this.app);
    this.configureApp();
    this.setRoutes();
    this.startServer();
  }


  configureApp() {
    this.app.engine('.jsx', renderer.server.create({
      reactRoutes: pathJoin(__dirname, 'components/routes.jsx')
    }));
    this.app.set('views', pathJoin(__dirname, 'components'));
    this.app.set('view engine', 'jsx');
    this.app.set('view', renderer.expressView);

    this.app.use(cookieParser());
    this.app.set('trust proxy', 1);

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use( express.static(pathJoin(__dirname, '../public')) );
    this.app.use(favicon(pathJoin(__dirname, '../public/favicon.ico')) );
    this.app.use(session({
      name: 'servercrafter',
      secret: config.SESSION_SECRET
    }));

    this.app.use(GlobalsMiddleware.bind(this, this.app));
  }


  startServer() {
    let server = this.app.listen(config.PORT, function() {
      let host = server.address().address;
      let port = server.address().port;

      console.info(`Example app listening at http://${host}:${port}`);
    });
    SocketIOConnection.instance.connect(server);
  }


  setRoutes() {
    for (let route of routesList) {
      this.routes.add(route.route, route.type, route.func, route.mediators);
    }
  }
}

export default new Application();
