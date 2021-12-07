import StateMachine from "./StateMachine";
import { CodeProject, FileTreeNode, ProjectJson } from 'code'
import { codeProjectRemote, fileRemote } from "@skedo/request";

export enum States {
  Initialize = 0,
  Selected
}

export enum Events {
  AUTO,
  Select
}

export enum Topic {
  SelectionChanged,
  Loaded
}

/**
 * UI继承状态机，状态机继承emiter.UI组件中就有了状态机的注册与发送，emiter的on与emit
 */
export class CodeEditorUI extends StateMachine<
  States,
  Events,
  Topic
> {
  private project: CodeProject  // 状态对象
  private selectedFile?: FileTreeNode  // 选中的文件
  private loaded: boolean = false

  constructor(page: string) {
    super(0)
    this.project = new CodeProject(page, "codeless")
    // 初始化选中回调函数
    this.describe("这里是选中逻辑", () => {
      this.register(
        [States.Initialize, States.Selected],
        States.Selected,
        Events.Select,
        (node: FileTreeNode) => {
          this.selectedFile = node
          this.emit(Topic.SelectionChanged)
        }
      )
    })

    this.load()
  }

  private async load() {

    /* 获取RDBMS */
    let result = await codeProjectRemote.get(this.project.getName())
    if (!result.data) {
      result = await codeProjectRemote.get("codeless-template")
      result.data.name = this.project.getName()
    }
    const json: ProjectJson = result.data
    this.project = CodeProject.fromJSON(json)

    /* 获取文件 */
    const files = [
      ...this.project
        .getRootNode()
        .getFiles((x) => x.getType() === "file"),
    ]

    for (let file of files) {
      const result = await fileRemote.get(file.getUrl())
      const content = result.data
      file.setContent(content)
      file.updated()
    }

    this.loaded = true
    this.emit(Topic.Loaded)  // 下载完成之后，通知emtier
  }

  public getSelectedFile() {
    return this.selectedFile
  }

  /** 获取对象JSON，用来做渲染 */
  public getJSON() {
    if (!this.loaded) {
      return null
    }
    return this.project.toJSON()
  }

  public getProject() {
    return this.project
  }
}