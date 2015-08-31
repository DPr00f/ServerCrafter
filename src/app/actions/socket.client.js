import SocketDispatcher from '../dispatchers/socket.client';
import SocketEvents from '../events/socket';

var SocketActions = {
  connect: function connect(token) {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.CONNECT,
      token: token
    });
  },


  authenticated: function authenticated() {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.AUTHENTICATED
    });
  }
};

export default SocketActions;
