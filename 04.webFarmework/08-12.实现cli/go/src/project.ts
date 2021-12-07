import ProjectCreator from "./projectCreator"
import ProjectDevServer from "./projectDevServer"
import projectRollupInstance from "./projectRollupInstance"

/**
 * 这是个门面模式，所有功能集合在这个类中
 */
export default class Project {

  private name: string
  private dir: string
  constructor(name?: string) {
    this.name = name || ""
    this.dir = process.cwd()
  }

  public getCwd() {
    return this.dir
  }
  public setCwd(cwd: string) {
    this.dir = cwd
    process.chdir(cwd)
  }
  public getName() {
    return this.name
  }

  public static async create() {
    const projectCreate = new ProjectCreator()
    return await projectCreate.create()
  }

  public devServer(port: number) {
    const devServer = new ProjectDevServer(port)
    devServer.start()
  }

  public watch() {
    const rollupInstance = new projectRollupInstance()
    rollupInstance.watch()
  }
}