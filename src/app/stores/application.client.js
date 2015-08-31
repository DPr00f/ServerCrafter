import ApplicationDispatcher from '../dispatchers/application.client';
import { EventEmitter } from 'events';
import Symbol from 'es6-symbol';

var singleton = Symbol();
var singletonEnforcer = Symbol();


class ApplicationStore extends EventEmitter {
  constructor(enforcer) {
    super();
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApplicationStore(singletonEnforcer);
    }

    return this[singleton];
  }
}

ApplicationDispatcher.instance.register(function(action) {
  // switch(action.actionType) {
  //   case SocketEvents.CONNECT:
  //     if (!!action.token) {
  //       SocketController.instance.setToken(action.token);
  //       SocketController.instance.connect();
  //     }
  //     break;
  //
  //   case SocketEvents.AUTHENTICATED:
  //     ApplicationStore.instance.emitAuthenticated();
  //     break;
  //   default:
  //     // no op
  // }
});

export default ApplicationStore;
