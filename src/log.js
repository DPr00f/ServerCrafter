import config from './config';
import 'colors';

var oldLog = console.log;

console.log = function() {
  if (config.LOG.LOG) {
    oldLog.apply(console, arguments);
  }
};

console.debug = function() {
  if (config.LOG.DEBUG) {
    let mainArguments = Array.prototype.slice.call(arguments);
    mainArguments.unshift('[DEBUG]');
    for (var k in mainArguments) {
      if (mainArguments.hasOwnProperty(k) && typeof mainArguments[k] === "string") {
        mainArguments[k] = mainArguments[k].blue;
      }
    }
    oldLog.apply(console, mainArguments);
  }
};

console.info = function() {
  if (config.LOG.INFO) {
    let mainArguments = Array.prototype.slice.call(arguments);
    mainArguments.unshift('[INFO]');
    for (var k in mainArguments) {
      if (mainArguments.hasOwnProperty(k) && typeof mainArguments[k] === "string") {
        mainArguments[k] = mainArguments[k].green;
      }
    }
    oldLog.apply(console, mainArguments);
  }
};

console.error = function() {
  if (config.LOG.ERRORS) {
    let mainArguments = Array.prototype.slice.call(arguments);
    mainArguments.unshift('[ERROR]');
    for (var k in mainArguments) {
      if (mainArguments.hasOwnProperty(k) && typeof mainArguments[k] === "string") {
        mainArguments[k] = mainArguments[k].red;
      }
    }
    oldLog.apply(console, mainArguments);
  }
};

console.mysql = function() {
  if (config.LOG.MYSQL) {
    let mainArguments = Array.prototype.slice.call(arguments);
    mainArguments.unshift('[MYSQL]');
    for (var k in mainArguments) {
      if (mainArguments.hasOwnProperty(k) && typeof mainArguments[k] === "string") {
        mainArguments[k] = mainArguments[k].magenta;
      }
    }
    oldLog.apply(console, mainArguments);
  }
};

console.warning = function() {
  if (config.LOG.WARNINGS) {
    let mainArguments = Array.prototype.slice.call(arguments);
    mainArguments.unshift('[WARNING]');
    for (var k in mainArguments) {
      if (mainArguments.hasOwnProperty(k) && typeof mainArguments[k] === "string") {
        mainArguments[k] = mainArguments[k].yellow;
      }
    }
    oldLog.apply(console, mainArguments);
  }
};
