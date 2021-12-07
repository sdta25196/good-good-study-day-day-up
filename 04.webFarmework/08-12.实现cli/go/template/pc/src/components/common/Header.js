import { memo, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Input, Select, message } from 'antd'
import './sass/Header.scss'
import LOGO from '../../assets/images/logo.png'
import LOCATIONIMG from '../../assets/images/location.png'
import { SIMPLE_CITY } from '../../assets/static'
import { useSelector } from 'react-redux'

const { Option } = Select

export const searchType = {
  SCHOOL: "school",
  SPECIAL: "special",
  NEWS: "news",
}

export const currentTopPageType = {
  HOME: "HOME",
  SCHOOL: "SCHOOL",
  SPECIAL: "SPECIAL",
  NEWS: "NEWS",
}

/**
*
* @author: 田源
* @date: 2021-08-02 15:16
* @description: 页头组件，禁止使用，由layout组件自动引入
*
*/
function Header({ currentTopPage }) {
  const { cityid, city } = useSelector(store => store.userLocation)
  const history = useHistory()
  const { location: { pathname } } = history
  // 记录输入框的值
  const inputRef = useRef(null)
  // 记录搜索状态 ref用法
  const currentSearch = useRef({
    type: pathname.split("/")[1] === "search" ? pathname.split("/")[2] : searchType.SCHOOL,
    value: decodeURIComponent(pathname.split("/")[1] === "search" ? pathname.split("/")[3] : "")
  })

  const [isHome] = useState(window.location.pathname === "/")

  const keyDown = (e) => {
    if (e.keyCode !== 13) return
    search()
  }

  const verifySearchValue = (searchValue) => {
    if (searchValue.length > 50) {
      message.error("已达到输入文字上线");
      return false
    }
    // if (searchValue.match(/[^\w\u4e00-\u9fa5]/g)) {
    //   message.error("请不要输入非法字符");
    //   return false
    // }
    return true
  }
  /**搜索 */
  const search = () => {
    const searchValue = inputRef.current.state.value?.trim()
    if (!searchValue) {
      message.error("请输入您要搜索的内容");
      return
    }
    if (!verifySearchValue(searchValue)) return
    currentSearch.current.value = searchValue
    history.push(`/search/${currentSearch.current.type}/${searchValue}`)
  }

  /**切换城市 */
  const goLocation = () => {
    history.push(`/location?path=${pathname}`)
  }
  return (
    <header className={isHome ? 'bg-white' : 'bg-white headerBtmBorder'}>
      <div className="header-content">
        <img src={LOGO} alt="职教网" className='logo pointer' onClick={() => history.push("/")} />
        <div className='nav'>
          <Link to="/">
            <span className={currentTopPage === currentTopPageType.HOME ? "color-main" : ""}>首页</span>
          </Link>
          <Link to="/school">
            <span className={currentTopPage === currentTopPageType.SCHOOL ? "color-main" : ""}>中职学校</span>
          </Link>
          <Link to="/special">
            <span className={currentTopPage === currentTopPageType.SPECIAL ? "color-main" : ""}>职教专业</span>
          </Link>
          <Link to="/news">
            <span className={currentTopPage === currentTopPageType.NEWS ? "color-main" : ""}>职教热点</span>
          </Link>
        </div>
        <div className='search'>
          <Input addonBefore={
            <Select defaultValue={currentSearch.current.type} className="select-before"
              onChange={(e) => currentSearch.current.type = e}>
              <Option value={searchType.SCHOOL}>院校</Option>
              <Option value={searchType.SPECIAL}>专业</Option>
              <Option value={searchType.NEWS}>资讯</Option>
            </Select>
          } addonAfter={
            <div className="searchBtn" onClick={search}>
              搜索
            </div>
          } defaultValue={currentSearch.current.value} placeholder="请输入搜索内容"
            ref={inputRef}
            onKeyDown={(e) => keyDown(e)}
            onChange={(e) => verifySearchValue(e.target.value)}
          />
        </div>
        <div className='location' onClick={() => goLocation()}>
          <img src={LOCATIONIMG} alt="职教网" width='14px' height='18px' />
          <span className="color-main">{SIMPLE_CITY[cityid] || city}</span>
          <span className='changeCity'>[切换城市]</span>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)