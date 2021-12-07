import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { PROVINCE } from '../assets/static'

/**
*
* @author : 田源
* @date : 2021-08-16 09:36
* @description : 提供筛选条件使用到的省份数据Array<May<name,id>>，以及筛选条件的省份id
*
*/

function useProvince() {
  const { provinceid: userProvinceid } = useSelector(store => store.userLocation)
  // 格式化省份数据
  const province = useMemo(() => {
    return PROVINCE.map(item => ({ "name": item.province, "id": item.provinceid }))
  }, [])

  // 初始化当前省份id
  let [provinceId, setPid] = useState(parseInt(userProvinceid))
  useEffect(() => {
    setPid(parseInt(userProvinceid))
  }, [userProvinceid])

  return {
    province,
    setProvinceId: setPid,
    provinceId,
  }
}

export default useProvince