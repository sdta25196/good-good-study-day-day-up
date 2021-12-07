import { useHistory } from "react-router-dom"
import { NewsCard } from "../common"
/**
*
* @author : 田源
* @date : 2021-08-09 10:28
* @description : 搜索资讯列表
*
*/
function SearchNews({ dataList = [] }) {
  const history = useHistory()
  return (
    <div>
      {
        dataList.map(item => {
          return <NewsCard time={item.publish_time} title={item.title} key={item.news_id}
            subTitle={item.synopsis} scource={item.froms} onClick={() => history.push(`/news/detail/${item.news_id}`)} />
        })
      }
    </div>
  )
}

export default SearchNews