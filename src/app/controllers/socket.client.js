import io from 'socket.io-client';
import config from '../../config.client';
import Symbol from 'es6-symbol';
import SocketAction from '../actions/socket.client';
import ApplicationAction from '../actions/application.client';
import SocketEvents from '../events/socket';

var singleton = Symbol();
var singletonEnforcer = Symbol();


class SocketController {

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    this.token = "";
    this.socket = io(config.socketIO.connectUrl);
  }


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new SocketController(singletonEnforcer);
    }

    return this[singleton];
  }


  connect() {
    this.socket = io.connect(this.getToken(true), {
      'forceNew': true
    });
    this.socket.on(SocketEvents.AUTHENTICATED, function () {
      SocketAction.authenticated();
    }).on(SocketEvents.DISCONNECT, function () {
      ApplicationAction.notify('You have been disconnected from the server.\nTrying to reconnect...');
    }).on(SocketEvents.FAILED_ADDING_SERVER, function(message) {
      ApplicationAction.notify(message);
    }).on(SocketEvents.GLOBAL_ADDED_SERVER, function(serverInfo) {
      SocketAction.globalAddedServer(serverInfo);
    }).on(SocketEvents.ADDED_SERVER, function() {
      SocketAction.addedServer();
    }).on(SocketEvents.SERVER_TEST_SUCCESS, function(message) {
      ApplicationAction.notify(message, 'success');
    }).on(SocketEvents.SERVER_TEST_FAILED, function(message) {
      ApplicationAction.notify(message);
    });
  }


  setToken(token) {
    this.token = token;
  }


  getToken(formatted = false) {
    return formatted ? this.token.length > 0 ? `?token=${this.token}` : this.token : this.token;
  }


  addServer(serverInfo) {
    this.socket.emit(SocketEvents.ADD_SERVER, serverInfo);
  }


  testServer(serverInfo) {
    this.socket.emit(SocketEvents.TEST_SERVER, serverInfo);
  }
}

export default SocketController;
