import { useEffect, useState } from "react"
import { Laypage, FilterCompents, Nodata } from "../../components/common"
import { SpecialPageSchoolList } from "../../components/special"
import { useCity, useProvince } from "../../hooks"
import EolAxios, { API } from "../../axios"
import styles from '../../components/special/sass/SpecialPage.module.scss'
import { controlScroll } from "../../tools"


/**
*
* @author : 田源
* @date : 2021-08-11 14:22
* @description : 职教专业落地页-开设院校
*
*/
function SpecialPageSchool(props) {
  const { match: { params: { specialId } } } = props
  const { setProvinceId, province, provinceId } = useProvince()
  const { setCityId, setCity, city, cityId } = useCity(provinceId)

  const [schoolType, setSchoolType] = useState([])
  const [schoolTypeId, setSchoolTypeId] = useState("")
  const [schoolFeature, setSchoolFeature] = useState([])
  const [schoolFeatureId, setSchoolFeatureId] = useState("")

  const [pageData, setPageData] = useState({
    dataList: [],
    total: 0,
    currentPage: 1,
    nodata: false,
    size: 20
  })

  /** 筛选条件 */
  useEffect(() => {
    EolAxios.staticRequest({
      path: API.schoolFilter
    }).then(res => {
      if (res === null) return
      setSchoolType(type => {
        let format = res[2].map(item => ({ name: item.name, id: item.code }))
        return type = format
      })
      setSchoolFeature(feature => {
        let format = res[4].map(item => ({ name: item.name, id: item.code }))
        return feature = format
      })
    })
  }, [])

  useEffect(() => {
    getList({
      province_id: provinceId,
      city_id: cityId,
      type: schoolTypeId,
      characteristic: schoolFeatureId,
      spe_id: specialId,
      sizeL: pageData.size,
      page: 1
    })
  }, [provinceId, cityId, schoolTypeId, schoolFeatureId, pageData.size, specialId])

  const chooseProvince = (id) => {
    setProvinceId(id)
    setCity(id)
    setCityId("")
  }

  const pageChange = (page) => {
    controlScroll({ y: 400 })
    getList({
      province_id: provinceId,
      city_id: cityId,
      type: schoolTypeId,
      characteristic: schoolFeatureId,
      spe_id: specialId,
      sizeL: pageData.size,
      page
    })
  }

  function getList({
    page = 1,
    province_id,
    city_id,
    type,
    characteristic,
    spe_id,
    size,
  }) {
    EolAxios.dynamicRequest({
      path: API.schoolList,
      formData: {
        province_id,
        city_id,
        type,
        characteristic,
        spe_id,
        size,
        page
      }
    }).then(res => {
      if (res === null) return
      if (res.info.length) {
        setPageData(data => data = {
          ...data,
          dataList: res.info,
          total: parseInt(res.rows),
          currentPage: page,
          nodata: false,
        })
      } else {
        setPageData(data => data = {
          ...data,
          dataList: [],
          total: 0,
          currentPage: 1,
          nodata: true,
        })
      }
    })
  }

  return (
    <div className={styles.schoolPage}>
      <div className={styles.filterBox}>
        <FilterCompents title="院校省份" filter={province} activeId={provinceId} onClick={chooseProvince} />
        <FilterCompents title="院校地区" filter={city} activeId={cityId} onClick={setCityId} addAll />
        <FilterCompents title="办学性质" filter={schoolType} activeId={schoolTypeId}
          onClick={setSchoolTypeId} addAll />
        <FilterCompents title="院校特色" filter={schoolFeature} activeId={schoolFeatureId}
          onClick={setSchoolFeatureId} addAll />
      </div>
      <div className={styles.listBox}>
        <SpecialPageSchoolList dataList={pageData.dataList} />
        <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
        <Nodata isShow={pageData.nodata} />
      </div>
    </div>
  )
}

export default SpecialPageSchool
