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
import dynamic from 'next/dynamic'
const TalkBox=dynamic(import('../components/TalkBox' ))
const MusicBox= dynamic(import ('../components/MusicBox.js'), {ssr: false})
const Index=({data})=>{
 
  const [tableData,setTableData]=useState(data)
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
     <MusicBox/>
    </TabPane>
    <TabPane tab="聊两句" key="3">
    <TalkBox/>
    </TabPane>
  </Tabs>
  <Footer/>
  </div>
  </div>
)
}

Index.getInitialProps=async(ctx)=>{ 
 //console.log('res cookie',ctx)
const data=await getList({pageSize:10,pageNum:1})
 return{ 
  data
 }
}

export default Index;