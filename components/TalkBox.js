import {Row, Col, Input, Button,message} from 'antd';
import {useState,useEffect,useContext} from "react"
import MyContext from '../utils/my-content';
import {saveMessage} from "../api/message"

const TalkBox = ({uName,superAdmin,to}) => {
     const [talkData,setTalkData]=useState([])
    const context=useContext(MyContext);
     useEffect(() => {
        const talkInfo=[...context.dataSelf,...context.dataTo];
        talkInfo.sort((a,b) => {
            return a.createtime > b.createtime ? 1 : -1;
        })
        console.log('即时通讯数据',talkInfo);
        setTalkData(talkData=>talkInfo)
         return () => {
         };
     },[context])
    const info=JSON.parse(localStorage.getItem("_info_visitor"));
    const handleMessage=()=>{ 
        console.log('触发了socket') 
        if(!messages){ 
          message.warning('请勿发送空消息'); 
          return false;     
        }
        const params={ 
            content:messages,
            to:superAdmin?to:"superAdmin",
            from:superAdmin?'superAdmin':info.uname,
            name:superAdmin?'superAdmin':info.name
           }
           saveMessage(params).then(res=>{
            console.log('发送信息',res);
            if(!res.errno){ 
             context.socket.emit('sendmsg',params)  
            }
            setMessage(messages=>'')
          })
    }
   const [messages,setMessage]=useState(null)

   const handleContentChange=(e)=>{ 
    e.persist()
    setMessage(messages=>e.target.value)
    }
 
    const talkList=talkData.map((v)=>{
     if(superAdmin){ 
        return(
            <div key={v.id} className={v.from_m=='superAdmin'?'rightPanel clearfix':'leftPanel clearfix'}>
            <img src="../static/images/boy.png" className={v.from_m=='superAdmin'?"userImg right":"userImg"} alt=""/> 
            <div className={v.from_m=='superAdmin'?"textBox right":'textBox'}>
                <p className={v.from_m=='superAdmin'?"talkContent right":'talkContent'}>{v.message}</p>
              </div>
            </div>
        )  
     }
     else{ 
      return(<div key={v.id} className={v.from_m=='superAdmin'?'leftPanel clearfix':'rightPanel clearfix'}>
      <img src="../static/images/boy.png" className={v.from_m=='superAdmin'?"userImg":"userImg right"} alt=""/> 
      <div className={v.from_m=='superAdmin'?'textBox':"textBox right"}>
          <p className={v.from_m=='superAdmin'?"talkContent":'talkContent right'}>{v.message}</p>
        </div>
      </div>)  
     }

     })

    return (
        <div className="talkBox clearfix"> 
            <div className="phone hide-scroll"> 
              <div className='leftPanel clearfix'>
              <img src="../static/images/boy.png" className="userImg" alt=""/> 
               <div className="textBox">
                <p>名字</p>
                 <p className="talkContent">内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容</p>
               </div>
             </div>
             <div className="rightPanel clearfix">
             <img src="../static/images/boy.png" className="userImg right" alt=""/> 
             <div className="textBox right">
                 <p className="talkContent">内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容</p>
               </div>
             </div> 
             {talkList}
            </div>
           <div className="sendMessage">
           <Input placeholder="" value={messages}  onChange={handleContentChange} />  
           <Button onClick={handleMessage}style={{width:"100%",background:"#96eb6a",border:"none"}} type="primary">发送</Button>
           </div>            
            <style jsx>{`
                   .sendMessage{ 
                    width:3rem;margin:0 auto;
                   }
                     `}</style>
        </div>
    )
}

export default TalkBox