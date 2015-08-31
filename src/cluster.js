import cluster from 'cluster';

if (cluster.isMaster) {
  let cpuCount = require('os').cpus().length;

  for (let i =0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  console.log('Cluster ' + cluster.worker.id + ' started!');
  require('./server');
}
