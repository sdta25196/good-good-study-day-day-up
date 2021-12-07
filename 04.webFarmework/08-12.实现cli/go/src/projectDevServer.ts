import express, { Express } from "express"
import projectPathResolve from "./resolver"


export default class ProjectDevServer {


  port: number
  app: Express
  constructor(port: number) {
    this.port = port
    this.app = express()
  }

  start() {
    this.app.get('/', (req, res) => {
      res.sendFile(projectPathResolve("index.html"))
    })
    this.app.use('/', express.static(projectPathResolve('./build')))

    const port = this.port
    this.app.listen(port, () => {
      console.log("项目已经启动了~");
    })
  }
}