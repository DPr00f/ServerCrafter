import { Dispatcher } from 'flux';
import Symbol from 'es6-symbol';

var singleton = Symbol();
var singletonEnforcer = Symbol();

class SocketDispatcher extends Dispatcher {
    constructor(enforcer) {
      super();
      if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }


    static get instance() {
      if (!this[singleton]) {
        this[singleton] = new SocketDispatcher(singletonEnforcer);
      }

      return this[singleton];
    }
}

export default SocketDispatcher;
