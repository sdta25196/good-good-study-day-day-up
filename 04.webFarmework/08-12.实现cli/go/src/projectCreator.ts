import fs from "fs";
import inquirer from "inquirer"
import path from "path"
import { runCmd } from "./cmdRunner"
import Project from "./project"

export default class ProjectCreator {

  public async create() {
    const projectType = await this.askProjectType()
    const projectName = await this.inputProjectName()
    console.log(projectType, projectName);

    const project = new Project(projectName)
    await runCmd(
      `mkdir ${projectName}`,
      {
        cwd: project.getCwd()
      }
    )
    project.setCwd(path.resolve(project.getCwd(), projectName))
    switch (projectType) {
      case 'pc':
        this.createTemplatePc(project)
        break;
      case 'h5':
        break;
      case 'admin':
        break;
    }
    return Object
  }

  private createTemplatePc(project: Project) {
    const tplBase = path.resolve(__dirname, "../template/pc")
    const envs: Record<string, string> = {}
    envs["PROJECT_NAME"] = project.getName()
    this.recursiveCopy(tplBase, project.getCwd(), envs)
  }

  private recursiveCopy(from: string, to: string, envs: Record<string, string>) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }
    const files = fs.readdirSync(from)
    files.forEach((file) => {
      const fullnameFrom = path.resolve(from, file)
      const fullnameTo = path.resolve(to, file)
      if (fs.statSync(fullnameFrom).isDirectory()) {
        this.recursiveCopy(fullnameFrom, fullnameTo, envs)
        return
      }

      if (fullnameFrom.match(/.(json|js|jsx|ts|tsx|yml|yaml)/)) {
        // 找到文件替换模板
        const content = fs.readFileSync(fullnameFrom, 'utf-8')
          .replace(/\{&\{.*\}&\}/g, (x) => {
            x = x.replace('{&{', "")
            x = x.replace('}&}', "")
            x = x.trim()
            return envs[x]
          })
        // 写到工作目录
        fs.writeFileSync(fullnameTo, content, 'utf-8')
      } else {
        fs.copyFileSync(fullnameFrom, fullnameTo)
      }

    })
  }

  private async inputProjectName() {
    const result = await inquirer.prompt(
      {
        name: "name",
        message: "What's your project name:",
        type: "input",
      }
    )
    return result.name
  }
  private async askProjectType() {
    const result = await inquirer.prompt(
      {
        name: "type",
        message: "What's your project type:",
        default: "pc",
        type: "list",
        choices: [
          "pc",
          "h5",
          "admin"
        ]
      }
    )
    return result.type
  }
}