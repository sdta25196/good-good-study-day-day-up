import cluster from 'cluster'

import {cpus} from 'os'
import http from 'http' 

if (!cluster.isWorker) {

  for (let i = 0; i < cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} exit with ${code}, ${signal}`)
  })
} else {
  console.log('start server', process.pid)
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end("hello world! \n" + process.pid)
    })
    .listen(3000)
}