import fs from 'fs'
import path from 'path'
import { CodeProject } from "./CodeProject"
import { FileTreeNode } from "./FileTreeNode"
import { codeProjectRemote, fileRemote } from '@skedo/request'
import { ProjectJson } from './type'

export class CodeProjectFS {
  private cwd: string //工作路径
  constructor(cwd: string) {
    this.cwd = cwd
  }

  // 自己写的createFileNode
  private myCreateFiletree(dir: string, name = ""): FileTreeNode {
    // 拿到文件夹下所有文件
    const files = fs.readdirSync(dir)
    // 创建一个filetreenode对象
    const fNode = new FileTreeNode("dir", name)
    // 遍历构建对象树
    files.forEach(file => {
      // 先拿到全名
      const fullName = path.resolve(dir, file)
      // 文件夹就递归
      if (fs.statSync(file).isDirectory()) {
        fNode.add(this.myCreateFiletree(fullName, name))
      } else {
        const f = new FileTreeNode("file", file)
        f.setContent(fs.readFileSync(fullName, 'utf8')) // 节点的内容
        fNode.add(f)
      }
    })
    return fNode
  }

  // 读文件夹中的文件，构建一棵file节点树
  private createFileNode(dir: string, name = ""): FileTreeNode {
    const files = fs.readdirSync(dir)

    const fNode = new FileTreeNode("dir", name)

    for (let file of files) {
      const fullName = path.resolve(dir, file)
      if (fs.statSync(fullName).isDirectory()) {
        fNode.add(this.createFileNode(fullName, file))
      } else {
        const fileNode = new FileTreeNode("file", file)
        fileNode.setContent(fs.readFileSync(fullName, 'utf8')) //
        fNode.add(fileNode)
      }
    }
    return fNode
  }

  // 上传
  public async upload(project: CodeProject) {

    const fileNode = this.createFileNode(this.cwd) //拿到file节点树

    const filesToUpload = [...fileNode.getUpdates()] // 拿到file节点树中需要更新的节点

    /* 逐个上传，把所有的树节点内容上传到OSS中 */
    for (let file of filesToUpload) {
      const result = await fileRemote.post1(
        "/code",
        file.getExt(),
        file.getContent()
      )
      file.setUrl(result.data) // 获取上传完成的地址，给树节点的url
      file.updated()
    }

    /* 上传项目的JSON，所有的节点上传到OSS中之后，把整个file树的完整数据上传到数据库中 */
    project.setRootNode(fileNode)
    const json = project.toJSON()
    console.log(JSON.stringify(json, null, 2))
    await codeProjectRemote.put(project.getName(), json)

    console.log(await codeProjectRemote.get(project.getName()))

  }

  // 网络下载
  public async download(name: string) {
    /* 从RDBMS中获取项目 */
    const result = await codeProjectRemote.get(name)
    const json: ProjectJson = result.data
    const project = CodeProject.fromJSON(json)

    /* 将文件下载到本地磁盘并创建对应的目录结构 */
    await this.downloadFile(this.cwd, project.getRootNode())
    return project
  }

  // 下载到本地文件
  private async downloadFile(base: string, node: FileTreeNode) {

    if (node.getType() === "dir") {
      if (fs.existsSync(path.resolve(base, node.getName()))) {
        fs.rmdirSync(path.resolve(base, node.getName()), {
          recursive: true
        })
      }
      fs.mkdirSync(path.resolve(base, node.getName()))

      for (let child of node.getChildren()) {
        await this.downloadFile(path.resolve(base, node.getName()), child)
      }
      return
    }

    /* 下载文件内容到磁盘 */
    const url = node.getUrl()
    const result = await fileRemote.get(url)
    const content = result.data
    node.setContent(content)
    node.updated()

    fs.writeFileSync(
      path.resolve(base, node.getName()),
      content,
      "utf8"
    )

  }

}