import Server from '../models/server';
function getServers(app, callback) {
  if(app.locals.token) {
    Server.findAll({
      order: [ 'displayName' ],
      attributes: ['id', 'displayName', 'hostname', 'port']
    }).then((servers) => {
      app.locals.servers = servers;
      callback();
    });
  } else {
    callback();
  }
}

function exposeGlobals(app, req, res, next) {
  app.locals.title = 'ServerCrafter';
  app.locals.token = req.session && req.session.token ? req.session.token : false;
  getServers(app, next);
}

export default exposeGlobals;
