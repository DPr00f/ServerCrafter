import ApplicationDispatcher from '../dispatchers/application.client';
import ApplicationEvents from '../events/application';
import SocketEvents from '../events/socket';
import SocketStore from './socket.client';
import { EventEmitter } from 'events';
import Symbol from 'es6-symbol';
import _ from 'lodash';

var singleton = Symbol();
var singletonEnforcer = Symbol();


class ApplicationStore extends EventEmitter {
  constructor(enforcer) {
    super();
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    this.servers = [];
    SocketStore.instance.on(SocketEvents.GLOBAL_ADDED_SERVER, this.addServer.bind(this));
  }


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApplicationStore(singletonEnforcer);
    }

    return this[singleton];
  }


  sendNotification(message, type) {
    this.emit(ApplicationEvents.GOT_NOTIFICATION, {
      message: message,
      type: type
    });
  }

  setServers(servers) {
    this.servers = servers;
  }

  addServer(serverInfo) {
    this.servers = _.sortBy(this.servers.concat([serverInfo]), 'displayName');
    this.emit(ApplicationEvents.ADDED_SERVER, serverInfo);
  }

  getServers() {
    return this.servers;
  }
}

ApplicationDispatcher.instance.register(function(action) {
  switch(action.actionType) {
    case ApplicationEvents.NOTIFY:
      ApplicationStore.instance.sendNotification(action.message, action.type);
      break;

    case ApplicationEvents.SET_SERVERS:
      if(action.servers && action.servers.length) {
        ApplicationStore.instance.setServers(action.servers);
      }
      break;
    default:
      // no op
  }
});

export default ApplicationStore;
