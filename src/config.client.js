import { join } from 'path';
import { existsSync } from 'fs';
import merge from 'merge';

var config = {
  "socketIO": {
    "connectUrl": "http://servercrafter.local"
  }
};
var configPrivate = require( './config.client.private.js' );
config = merge.recursive(true, config, configPrivate);

export default config;
