import { UPDATE_USER_LOCATION } from './actionTypes'

/**
*
* @author : 田源
* @date : 2021-09-06 15:24
* @description : 用户定位信息
*
*/
export const updateUserLocation = (location) => {
  return {
    type: UPDATE_USER_LOCATION,
    payload: location,
  }
}