import { join } from 'path';
import { existsSync } from 'fs';
import merge from 'merge';

var privateConfigLocation = join( __dirname, 'config.private.js' );

var config = {
  LOG: {
    DEBUG: true,
    MYSQL: true,
    WARNINGS: true,
    ERRORS: true,
    LOG: true,
    INFO: true
  },
  MAX_CONNECTIONS: 2,
  PORT: process.env.PORT || 3001,
  IP: process.env.IP || "0.0.0.0",
  DB: "mysql://root:root@localhost:3306/servercrafter",
  PAGE_URL: "http://localhost:3001/",
  SESSION_SECRET: 'YjAKCYrQCxccZujYMBir2BscRjtaLaNobPfLsB6rGesHxzUmAd',
  CIPHER_ALGORITHM: 'aes-256-ctr',
  CIPHER_SECRET: 'eqsGzJxkceDPEedJWNyBXBihKbK99xzAxkgTmshLQJRFPiiWfn',
  JWT_SECRET: 'QHtyJNwadQaWnoYTyFLf43aZcAqWiPZQVqeQAHexCNFKVgUHcu',
  CONNECT_SOCKET_IO_REDIS: false,
  SOCKET_IO_REDIS: {
    host: 'servercrafter.local',
    port: 6379
  }
};

if (existsSync( privateConfigLocation )) {
  let configPrivate = require( privateConfigLocation );
  config = merge.recursive(true, config, configPrivate);
}

export default config;
