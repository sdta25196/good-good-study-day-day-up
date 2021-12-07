import { useEffect, useState } from "react"
import EolAxios, { API } from "../../axios"
import { Nodata } from "../../components/common"
import styles from '../../components/school/sass/SchoolPageSpecial.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-09 15:18
* @description : 中职院校落地页专业详情
*
*/

function SchoolPageSpecialDetail(props) {
  const { match: { params: { specialId } } } = props
  const [content, setContent] = useState("")
  const [showNoData, setShowNoData] = useState(false)
  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.specialDetail,
      formData: {
        id: specialId
      }
    }).then(res => {
      if (res === null) return
      setContent(res)
      setShowNoData(res === "")
    })
  }, [specialId])

  return (
    <>
      <div className={styles.detialTitle}>专业介绍</div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <Nodata isShow={showNoData} />
    </>
  )
}

export default SchoolPageSpecialDetail