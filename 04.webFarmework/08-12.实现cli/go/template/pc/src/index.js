import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { routes, RouteWithSubRoutes } from './router'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { updateUserLocation } from './redux/actions'
import { PROVINCE, CITY } from './assets/static'
import store from './redux/store'
import { Loading } from './components/common'
import './assets/style/common.scss'

/**
*
* @author: 田源
* @date: 2021-08-02 14:13
* @description: 职教网PC端入口文件
*
*/

function App() {
  const { provinceid } = useSelector(store => store.userLocation)
  const dispatch = useDispatch()
  let [localIsDone, setLocalIsDone] = useState(!!provinceid)

  useEffect(() => {
    // 处理定位
    if (!localIsDone) {
      let myCity = new window.BMap.LocalCity()
      myCity.get(function (result) {
        let initLocation = { "provinceid": 11, "province": "北京", "cityid": 1101, "city": "北京市" }
        try {
          const { cityid, provinceid, city } = CITY.find(ct => ct.city === result.name)
          const { province } = PROVINCE.find(pro => pro.provinceid === provinceid)
          initLocation = { provinceid, province, cityid, city }
        } catch (ex) {
        } finally {
          dispatch(updateUserLocation(initLocation))
          setLocalIsDone(true)
        }
      });
    }
  }, [dispatch, provinceid, localIsDone])

  return (
    <Suspense fallback={<Loading />}>
      {
        localIsDone &&
        <Router>
          <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </Switch>
        </Router>
      }
    </Suspense>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)