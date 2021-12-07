import Header from './Header'
import Footer from './Footer'
import { useEffect } from 'react'
import styles from './sass/Layout.module.scss'

/**
*
* @author: 田源
* @date: 2021-08-02 15:15
* @description: 整体布局组件
* @requires currentTopPage 当前页面的顶级归属页面
* @requires title 页面标题文件
*/
function Layout({
  children,
  title = "",
  description = "",
  header = true,
  footer = true,
  currentTopPage
}) {
  useEffect(() => {
    title && (document.querySelector("#zj-title").innerText = title)
    description && (document.querySelector("#zj-description").setAttribute("content", description))
  }, [title, description])
  return (
    <div>
      {header && <Header currentTopPage={currentTopPage}></Header>}
      <main className={styles.layout}>
        {children}
      </main>
      {footer && <Footer></Footer>}
    </div>
  )
}

export default Layout