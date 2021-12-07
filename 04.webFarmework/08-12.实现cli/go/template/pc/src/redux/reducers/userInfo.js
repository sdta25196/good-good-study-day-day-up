import { UPDATE_USER_LOCATION } from '../actions/actionTypes'

const initUserLocation = JSON.parse(localStorage.getItem("location") || "{}")

export const userLocation = (state = initUserLocation, action) => {
  switch (action.type) {
    case UPDATE_USER_LOCATION:
      const userLocation = { ...state, ...action.payload }
      window.localStorage.setItem("location", JSON.stringify(userLocation))
      return userLocation
    default:
      return state
  }
}
