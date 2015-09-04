import SocketDispatcher from '../dispatchers/socket.client';
import SocketController from '../controllers/socket.client';
import SocketEvents from '../events/socket';
import { EventEmitter } from 'events';
import Symbol from 'es6-symbol';

var singleton = Symbol();
var singletonEnforcer = Symbol();


class SocketStore extends EventEmitter {
  constructor(enforcer) {
    super();
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new SocketStore(singletonEnforcer);
    }

    return this[singleton];
  }

  emitAuthenticated() {
    this.emit(SocketEvents.AUTHENTICATED);
  }

  emitServerAdded() {
    this.emit(SocketEvents.ADDED_SERVER);
  }

  emitGlobalServerAdded(serverInfo) {
    this.emit(SocketEvents.GLOBAL_ADDED_SERVER, serverInfo);
  }
}

SocketDispatcher.instance.register(function(action) {
  var text;

  switch(action.actionType) {
    case SocketEvents.CONNECT:
      if (!!action.token) {
        SocketController.instance.setToken(action.token);
        SocketController.instance.connect();
      }
      break;

    case SocketEvents.AUTHENTICATED:
      SocketStore.instance.emitAuthenticated();
      break;

    case SocketEvents.ADD_SERVER:
      SocketController.instance.addServer(action.form);
      break;

    case SocketEvents.ADDED_SERVER:
      SocketStore.instance.emitServerAdded();
      break;

    case SocketEvents.GLOBAL_ADDED_SERVER:
      SocketStore.instance.emitGlobalServerAdded(action.serverInfo);
      break;

    case SocketEvents.TEST_SERVER:
      SocketController.instance.testServer(action.form);
      break;
    default:
      // no op
  }
});

export default SocketStore;
