import { useEffect, useState } from "react"
import EolAxios, { API } from "../../axios"
import styles from '../../components/school/sass/SchoolPageIntro.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-09 15:18
* @description : 中职院校落地页简介详情
*
*/
function SchoolPageIntroDetail(props) {
  const { match: { params: { schoolCode } } } = props
  const [intro, setIntro] = useState("")

  useEffect(() => {
    // 学校信息
    EolAxios.dynamicRequest({
      path: API.schoolIntro,
      formData: {
        data_code: schoolCode
      }
    }).then(res => {
      if (res === null) return
      setIntro(res.content)
    })
  }, [schoolCode])

  return (
    <>
      <div className={styles.detialTitle}>基本信息</div>
      <div dangerouslySetInnerHTML={{ __html: intro }}></div>
    </>
  )
}

export default SchoolPageIntroDetail