import SocketIOConnection from '../socket.io.connection';
import { Client } from 'ssh2';
import ServerModel from '../models/server';

class AddServer {
  validateIncomingServer(server, needDisplayName = true) {
    var errors = "";

    if (needDisplayName && (!server.display_name || server.display_name.length < 3)) {
      errors += "- Display name: 3 characters long\n";
    }
    if (!server.hostname || !server.hostname.length) {
      errors += "- Hostname: isn't set\n";
    }
    if (!server.port || !parseInt(server.port, 10)) {
      errors += "- Port: Wrong value, needs to be an integer\n";
    }
    if (!server.username || !server.username.length) {
      errors += "- Username: isn't set\n";
    }
    if ((!server.password || !server.password.length) && (!server.privateKey || !server.privateKey.length)) {
      errors += "- Password or Private Key: isn't set\n";
    }

    return (errors.length) ? errors : false;
  }


  socketTestServer(socket, server) {
    var errors = this.validateIncomingServer(server, false);

    if (errors) {
      SocketIOConnection.instance.failedServerTest(socket, errors + "Please verify the fields again");
      return;
    }

    var conn = new Client();
    conn.on('ready', function() {
      conn.end();
      SocketIOConnection.instance.successServerTest(socket, "Connected to server successfully");
    }).on('error', function() {
      SocketIOConnection.instance.failedServerTest(socket, "Connection to server failed, check if the server is running");
    }).connect({
      host: server.hostname,
      port: server.port,
      username: server.username,
      password: server.password
    });
  }

  socketNewServer(socket, server) {
    var errors = this.validateIncomingServer(server);

    if (errors) {
      SocketIOConnection.instance.failedAddingServer(socket, errors + "Please verify the fields again");
      return;
    }
    ServerModel.create({
      displayName: server.display_name,
      hostname: server.hostname,
      port: parseInt(server.port, 10),
      username: server.username,
      password: server.password
    }).then((server) => {
      SocketIOConnection.instance.serverAdded(socket, {
        id: server.id,
        displayName: server.displayName,
        hostname: server.hostname,
        port: server.port
      });
    }).error((err) => {
      if(err.name === 'SequelizeUniqueConstraintError') {
        SocketIOConnection.instance.failedAddingServer(socket, "The display name you picked is already in use.");
      }else {
        SocketIOConnection.instance.failedAddingServer(socket, "Database Error: " + err.message);
      }
    });
  }
}

export default new AddServer();
