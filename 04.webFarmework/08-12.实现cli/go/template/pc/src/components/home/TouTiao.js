import './sass/TouTiao.scss'
import TTBG from '../../assets/images/ttbg.png'
import { openWindow } from '../../tools'
/**
*
* @author : 田源
* @date : 2021-08-18 10:09
* @description : 首页职教头条
*
*/
function TouTiao({ list = [] }) {
  return (
    <div className="ttBox">
      <div>
        <img src={TTBG} alt="" width="302px" height="51px"/>
      </div>
      <ul>
        {list.map((item, i) => {
          return (
            <li key={i} onClick={() => openWindow(item.link)}>
              <span className="num"></span>
              <span className="content" title={item.title}>{item.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TouTiao