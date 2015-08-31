import socketIO from 'socket.io';
import SocketIORedis from 'socket.io-redis';
import config from '../config';
import Symbol from 'es6-symbol';
import SioJWT from 'socketio-jwt';
import jwt from 'jsonwebtoken';
import SocketEvents from './events/socket';

var singleton = Symbol();
var singletonEnforcer = Symbol();

class SocketIOConnection {
  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    this.transport = false;
    this.connectionCount = 0;
    this.ready = false;
  }


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new SocketIOConnection(singletonEnforcer);
    }

    return this[singleton];
  }

  connect(server) {
    this.transport = socketIO.listen(server);
    if (config.CONNECT_SOCKET_IO_REDIS) {
      this.transport.adapter(SocketIORedis({
        host: config.SOCKET_IO_REDIS.host,
        port: config.SOCKET_IO_REDIS.port
      }));
    }
    this.ready = true;
    this.transport.use(SioJWT.authorize({
      secret: config.JWT_SECRET,
      handshake: true
    }));
    this.transport.on('connection', this.handleConnection.bind(this));
  }


  isReady() {
    return this.ready;
  }


  handleConnection(socket) {
    this.connectionCount++;
    if (!!socket.decoded_token && !!socket.decoded_token.data && !!socket.decoded_token.data.username) {
      socket.emit(SocketEvents.AUTHENTICATED);
      this.bindEvents(socket);
    }else {
      socket.emit(SocketEvents.FAILED_AUTH);
    }
  }


  bindEvents(socket) {
    socket.on(SocketEvents.DISCONNECT, () => {
      console.debug('Socket disconnected id:', socket.id);
      this.connectionCount--;
    });
  }


  getToken(profile, secret, config = {expiresInMinutes: 60*5}) {
    return jwt.sign(profile, secret, config);
  }


  broadcast(eventName, message) {
    console.debug('Transmitted:', eventName);
    this.transport.emit(eventName, message);
  }
}

export default SocketIOConnection;
