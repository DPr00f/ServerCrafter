import React from 'react';
import Router from 'react-router';
import Index from './pages/index.jsx';
import Servers from './pages/servers.jsx';
import AddServer from './pages/add.server.jsx';
import App from './app.jsx';

var routes = (
  <Router.Route handler={App}>
    <Router.Route path="/" name="home" handler={Index}></Router.Route>
    <Router.Route path="/" name="settings" handler={Index}></Router.Route>
    <Router.Route path="/" name="profile" handler={Index}></Router.Route>
    <Router.Route path="/servers" name="servers" handler={Servers}></Router.Route>
    <Router.Route path="/servers/add" name="serverAdd" handler={AddServer}></Router.Route>
  </Router.Route>
);

export default routes;
