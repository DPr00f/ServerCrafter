import io from 'socket.io-client';
import config from '../../config.client';
import Symbol from 'es6-symbol';
import SocketAction from '../actions/socket.client';
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
      console.log('- disconnected');
    });
  }


  setToken(token) {
    this.token = token;
  }


  getToken(formatted = false) {
    return formatted ? this.token.length > 0 ? `?token=${this.token}` : this.token : this.token;
  }
}

export default SocketController;
