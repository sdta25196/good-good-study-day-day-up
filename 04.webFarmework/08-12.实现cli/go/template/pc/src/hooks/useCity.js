import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CITY } from '../assets/static'

/**
*
* @author : 田源
* @date : 2021-08-16 09:36
* @description : 提供筛选条件使用到的city数据Array<Map<name,id>>，以及筛选条件的cityId
*
*/

function useCity(provinceId) {
  const { cityid: userCityId } = useSelector(store => store.userLocation)
  // 格式化city数据
  const [city, setCity] = useState([])
  useEffect(() => {
    setCity(() => _getCity(provinceId))
  }, [provinceId])

  // 初始化当前cityId
  let [cityId, setCityId] = useState(CITY.find(item => item.cityid === parseInt(userCityId))?.cityid)
  useEffect(() => {
    setCityId(() => {
      return CITY.find(item => item.cityid === parseInt(userCityId))?.cityid
    })
  }, [userCityId])

  // 外部调用函数改变city
  const handleCity = (pid) => {
    setCity(() => _getCity(pid))
  }

  const _getCity = (pid) => {
    return CITY
      .filter(item => item.provinceid === parseInt(pid))
      .map(item => ({ "name": item.city, "id": item.cityid }))
  }

  return {
    city,
    setCity: handleCity,
    cityId,
    setCityId,
  }
}

export default useCity