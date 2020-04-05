import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import dynamic from 'next/dynamic'
const TalkBox=dynamic(import('../components/TalkBox'),{ssr: false})
const { TabPane } = Tabs;
const TalkManager=()=>{ 
    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
          {({ style }) => (
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
          )}
        </Sticky>
      );
  return( 
   <div style={{width:"1000px",margin:"0 auto"}}>
     <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab="Tab 1" key="1">
       <TalkBox uName="ee"  superAdmin={true} to="游昊华fa8be17f49ee43cdbc9b4c22b93751e1"/>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  </StickyContainer>
   </div>
  )
}
export default TalkManager