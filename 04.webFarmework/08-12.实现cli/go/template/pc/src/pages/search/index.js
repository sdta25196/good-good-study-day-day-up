import { useEffect, useState } from "react"
import EolAxios, { API } from "../../axios"
import { Breadcrumb, currentTopPageType, searchType, Layout, Laypage, Nodata } from "../../components/common"
import { SearchNews, SearchSchool, SearchSpecial } from "../../components/search"
import { controlScroll } from "../../tools"

export default function Search(props) {
  const { match, breadcrumb } = props

  const [type, setType] = useState(match.params.type)
  const [pageData, setPageData] = useState({
    dataList: [],
    total: 0,
    currentPage: 1,
    nodata: false,
    size: 20
  })

  useEffect(() => {
    setType(type => type = match.params.type)
    getList({
      type: match.params.type,
      value: match.params.value,
      page: 1,
      size: pageData.size
    })
  }, [match.params.type, match.params.value, pageData.size])


  const pageChange = (page) => {
    controlScroll({ y: 0 })
    getList({
      type,
      value: match.params.value,
      page,
      size: pageData.size,
    })
  }

  const getList = ({ type, value, page = 1, size }) => {
    switch (type) {
      case searchType.SCHOOL:
        requestSchool({ value, page, size })
        break;
      case searchType.SPECIAL:
        requetSpecial({ value, page, size })
        break;
      case searchType.NEWS:
        requetNews({ value, page, size })
        break;
      default:
        throw new Error("搜索类型错误")
    }
    function requestSchool({ value, page, size }) {
      EolAxios.dynamicRequest({
        path: API.schoolList,
        formData: {
          school_name: value,
          size,
          page
        }
      }).then(res => {
        if (res === null) return
        handleData(page, res.info, res.rows)
      })
    }
    function requetSpecial({ value, page, size }) {
      EolAxios.dynamicRequest({
        path: API.specialList,
        formData: {
          name: value,
          size,
          page
        }
      }).then(res => {
        if (res === null) return
        handleData(page, res.info, res.rows)
      })
    }
    function requetNews({ value, page, size }) {
      EolAxios.dynamicRequest({
        path: API.newsList,
        formData: {
          page,
          size,
          liketitle: value
        }
      }).then((res) => {
        if (res === null) return
        handleData(page, res.data, res.rows)
      })
    }
    function handleData(page, data, rows) {
      if (data.length) {
        setPageData(oData => oData = {
          ...oData,
          dataList: data,
          total: parseInt(rows),
          currentPage: page,
          nodata: false,
        })
      } else {
        setPageData(oData => oData = {
          ...oData,
          dataList: [],
          total: 0,
          currentPage: 1,
          nodata: true,
        })
      }
    }
  }



  return (
    <Layout title="职教网" currentTopPage={currentTopPageType.HOME}>
      <div>
        <Breadcrumb breadcrumb={breadcrumb} />
        {type === searchType.SCHOOL && <SearchSchool dataList={pageData.dataList} />}
        {type === searchType.SPECIAL && <SearchSpecial dataList={pageData.dataList} />}
        {type === searchType.NEWS && <SearchNews dataList={pageData.dataList} />}
        <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
        <Nodata isShow={pageData.nodata} />
      </div>
    </Layout>
  )
}