  import React, { useContext, useEffect, useState } from "react"
  import { useParams } from "react-router-dom"
  import { CodeProject, FileNodeJson, FileTreeNode, ProjectJson } from "code"
  import CodeEditor from "./components/CodeEditor"
  import TitleBar from "../components/frame/TitleBar"
  import { useCodeEditor } from "../hooks/useCodeEditor"
  import { CodeEditorUI, Events } from "./CodeEditorUI"
  import style from './ui.module.scss'


const EditorContext = React.createContext<CodeEditorUI | null>(null)

/**
 * 最终的UI组件
 */
export default () => {

  const { page: pageName } =
    useParams<{ [key: string]: string }>()
  const editor = useCodeEditor(pageName) //! 交互逻辑！

  const json = editor.getJSON()
  const show = json !== null

  console.log('render....', editor.getSelectedFile()?.getContent())
  return (
    <EditorContext.Provider value={editor}>
      <TitleBar pageName={pageName} name="codeless" />
      {show && (
        <div className={style.container}>
          <Explorer project={editor!.getProject()} />
          <EditorPanel
            code={editor.getSelectedFile()?.getContent()}
            lang={editor.getSelectedFile()?.getLanguage()}
          />
        </div>
      )}
    </EditorContext.Provider>
  )
}


const FileItem = ({ file }: { file: FileTreeNode }) => {

  const editor = useContext(EditorContext)
  const active = editor?.getSelectedFile() === file
  if (file.getType() === 'file') {
    return (
      <div onClick={() => {
        editor?.dispatch(Events.Select, file)
      }} className={`${style["editor-file"]} ${active ? 'active' : ''}`}>
        {file.getName()}
      </div>
    )
  }
  return <div className={style['editor-dir-group']}>
    <div className={style['editor-dir']}>{file.getName()}</div>
    {file.getChildren().map(x => {
      return <FileItem key={x.getName()} file={x} />
    })}
  </div>
}

const Explorer = ({ project }: { project: CodeProject }) => {
  return <div className={style.explorer}>
    <FileItem file={project.getRootNode()} />
  </div>
}



const EditorPanel = ({ code, lang }: {
  code?: string,
  lang?: string
}) => {
  const [ver, setVer] = useState(0)
  useEffect(() => {
    setVer(x => x + 1)
  }, [code])
  return <div key={ver} className={style['code-editor']}>
    <CodeEditor code={code || ""} lang={lang || "typescript"} />
  </div>
}