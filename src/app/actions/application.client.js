import ApplicationDispatcher from '../dispatchers/application.client';
import ApplicationEvents from '../events/application';

var ApplicationActions = {
  notify: function notify(message, type = "warning") {
    ApplicationDispatcher.instance.dispatch({
      actionType: ApplicationEvents.NOTIFY,
      message: message,
      type: type
    });
  },


  setServers: function setServers(servers) {
    ApplicationDispatcher.instance.dispatch({
      actionType: ApplicationEvents.SET_SERVERS,
      servers: servers
    });
  }
};

export default ApplicationActions;
