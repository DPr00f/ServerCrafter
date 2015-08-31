import { Dispatcher } from 'flux';
import Symbol from 'es6-symbol';

var singleton = Symbol();
var singletonEnforcer = Symbol();

class ApplicationDispatcher extends Dispatcher {
    constructor(enforcer) {
      super();
      if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }


    static get instance() {
      if (!this[singleton]) {
        this[singleton] = new ApplicationDispatcher(singletonEnforcer);
      }

      return this[singleton];
    }
}

export default ApplicationDispatcher;
