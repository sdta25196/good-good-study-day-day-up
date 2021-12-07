import { useEffect, useState } from 'react'
import EolAxios, { API } from '../../axios'
import styles from '../../components/special/sass/SpecialPage.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-11 14:22
* @description : 职教专业落地页-专业介绍
*
*/
function SpecialPageIntro(props) {

  const { match: { params: { specialId } } } = props
  const [intro, setIntro] = useState({})

  useEffect(() => {
    // 专业介绍
    EolAxios.dynamicRequest({
      path: API.specialIntro,
      formData: {
        id: specialId
      }
    }).then(res => {
      if (res === null) return
      setIntro(res)
    })
  }, [specialId])

  const introCopmonent = ({ title, content }) => {
    return (
      <>
        <div className={styles.detialTitle}>
          {title}
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content?.replace(/\r\n/g, '<br/>') }}>
        </div>
      </>
    )
  }
  return (
    <div className={styles.introBox}>
      {introCopmonent({
        title: `培养目标`,
        content: intro.target
      })}
      {introCopmonent({
        title: `职业能力要求`,
        content: intro.requirements?.join('\r\n')
      })}
      {introCopmonent({
        title: `专业教学主要内容`,
        content: intro.contents
      })}
      {introCopmonent({
        title: `专业（技能）方向`,
        content: intro.professional
      })}
      {introCopmonent({
        title: `职业资格证书举例`,
        content: intro.examples
      })}
      {introCopmonent({
        title: `继续学习专业举例`,
        content: intro.continuing
      })}
      {introCopmonent({
        title: `就业方向`,
        content: intro.employment
      })}
      {introCopmonent({
        title: `对应职业（岗位）`,
        content: intro.corresponding
      })}
    </div>
  )
}

export default SpecialPageIntro
