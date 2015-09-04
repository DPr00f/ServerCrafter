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
  },


  addServer: function addServer(form) {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.ADD_SERVER,
      form: form
    });
  },


  addedServer: function addedServer() {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.ADDED_SERVER
    });
  },


  globalAddedServer: function globalAddedServer(serverInfo) {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.GLOBAL_ADDED_SERVER,
      serverInfo: serverInfo
    });
  },


  testServer: function testServer(form) {
    SocketDispatcher.instance.dispatch({
      actionType: SocketEvents.TEST_SERVER,
      form: form
    });
  }
};

export default SocketActions;
