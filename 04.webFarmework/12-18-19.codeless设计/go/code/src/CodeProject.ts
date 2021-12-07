import { FileTreeNode } from "./FileTreeNode"
import { ProjectJson, ProjectType } from "./type"

/**
 * 描述对象，用来上传到数据库中，
 */
export class CodeProject {
  private name: string
  private type: string
  private fileNode: FileTreeNode // 使project与文件产生关联

  constructor(name: string, type: ProjectType) {
    this.name = name
    this.type = type
    this.fileNode = new FileTreeNode("dir", "root")
  }

  public toJSON() {
    return {
      name: this.name,
      type: this.type,
      fileTree: this.fileNode.toJSON()
    }
  }

  public setRootNode(node: FileTreeNode) {
    this.fileNode = node
  }

  public getRootNode() {
    return this.fileNode
  }

  public getName() {
    return this.name
  }

  public static fromJSON(obj: ProjectJson) {
    const project = new CodeProject(obj.name, obj.type)
    const fileTree = FileTreeNode.fromJSON(obj.fileTree)
    project.fileNode = fileTree
    return project
  }

}