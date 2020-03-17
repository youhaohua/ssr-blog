import Article from '../components/Article'
import Header from "../components/Header"
import Footer from "../components/Footer"
import LeftPanel from "../components/LeftPanel"
import {getList} from "../api/blog"
import { Pagination } from 'antd'
import WrapScale from "../components/WrapScale"
import { Tabs } from 'antd'
const { TabPane } = Tabs
import {
  useState,
  useReducer,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  memo,
  useMemo,
  useCallback,
} from 'react'
const Index=({data})=>{
 
  const [tableData,setTableData]=useState(data)
  console.log("data",tableData);
  const ArticleList=tableData.data.map((item)=>{ 
  return(
   <WrapScale key={item.id}>
  <Article data={item}/>
  </WrapScale>
)
  }) 

const handlePageChange=async (pageNum)=>{ 

  const data=await getList({pageSize:10,pageNum:pageNum});

  setTableData((v)=>{ return data } )

}

return(
  <div className="blogWrap">
  <LeftPanel/>
  <div className="rightContent min-scroll">
  <Header/>
  <Tabs defaultActiveKey="1">
    <TabPane tab="我的文章" key="1">
{/*   <img src="/static/images/index-bg02.jpeg" className="fixed-bg" alt=""/> */}
   <div className="listUl" style={{marginBottom:"50px"}}>
    {ArticleList}
    <Pagination style={{textAlign:"center",marginTop:"30px"}}  current={tableData.pageNum} onChange={handlePageChange} total={tableData.total} />
   </div>
    </TabPane>
    <TabPane tab="听首歌吧" key="2">
    </TabPane>
    <TabPane tab="跟我聊聊" key="3">
    </TabPane>
  </Tabs>
  <Footer/>
  </div>
  </div>
)
}

Index.getInitialProps=async(ctx)=>{ 
 console.log('res cookie',ctx)
const data=await getList({pageSize:10,pageNum:1})
 return{ 
  data
 }
}

export default Index;