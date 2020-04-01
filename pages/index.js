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
import {Button} from "antd"
import { StickyContainer, Sticky } from 'react-sticky';
const TalkBox=dynamic(import('../components/TalkBox' ))
const MusicBox= dynamic(import ('../components/MusicBox.js'), {ssr: false})
const Index=({data,test})=>{
  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
    </Sticky>
  );
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

/* const [test1,setTest]=useState(1)

useEffect(()=>{
  console.log("组件加载了")
  return()=>{
  console.log('组件卸载了')
  }
 },[])

const handleTest=()=>{ 

setTest(test1=>test1+1)
} */

return(
  <div className="blogWrap">
  <LeftPanel/>
  <div className="rightContent min-scroll">
  <Header/> 
  <StickyContainer>
  <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
    <TabPane tab="我的文章" key="1">
   <div className="listUl" style={{marginBottom:"50px"}}> 
   <div>
{/*    <p>{test1}</p>
  <Button onClick={handleTest}>点击</Button> */}
   </div>
    {ArticleList}
    <Pagination style={{textAlign:"center",marginTop:"30px"}}  current={tableData.pageNum} onChange={handlePageChange} total={tableData.total} />
   </div>
    </TabPane>
    <TabPane tab="听首歌吧" key="2"> 
     <MusicBox/>
    </TabPane>
    <TabPane tab="聊两句" key="3">
    <TalkBox uName="xx" />
    </TabPane>
  </Tabs> 
  </StickyContainer>
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