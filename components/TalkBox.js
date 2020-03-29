import {Row, Col, Input, Button} from 'antd';
var socket = require('socket.io-client')('http://localhost:6001');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
const TalkBox = () => {
    const handleMessage=()=>{ 
        console.log('触发了socket')
        socket.emit('sendmsg',{data:"testio"})
    }
    return (
        <div className="talkBox clearfix">
            <div className="phone hide-scroll"> 
            {/*  <img src="../static/images/talk.jfif" className="bgImg"  alt=""/> */}
             <div className='leftPanel clearfix'>
              <img src="../static/images/boy.png" className="userImg" alt=""/> 
               <div className="textBox">
                <p>名字</p>
                 <p className="talkContent">内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容</p>
               </div>
             </div>
             <div className="rightPanel cleaxfix">
             <img src="../static/images/boy.png" className="userImg right" alt=""/> 
             <div className="textBox right">
                 <p className="talkContent">内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容,内容内容内容内容</p>
               </div>
             </div>
                <Row className="talkButton">
                    <Col span={20}>
                        <Input placeholder="Basic usage"/>
                    </Col>
                    <Col span={4}>
                        <Button onClick={handleMessage} style={{width:"100%",background:"#96eb6a",border:"none"}} type="primary">发送</Button>
                    </Col>
                </Row>
            </div>
            <style jsx>{` .talkBox {
                        margin-bottom: 20px;
                        display: flex;
                        justify-content: center;
                    }
                    .phone {
                        height: 5rem;
                        width: 3rem;
                        padding:0.1rem;
                        border-radius:5px;
                        overflow-y:scroll;            
                        margin-top: 50px;
                        position: relative;
                        box-shadow: 0 14px 28px rgba(33, 150, 243, 0), 0 10px 10px rgba(9, 188, 215, 0.08);
                    }  
                    .leftPanel{ 
                     margin-bottom:0.12rem;
                    }
                    .userImg{ 
                     float:left;
                     display:inline-block;
                     width:0.3rem;
                    }
                     .textBox{ 
                      float:left;
                      width:2.2rem;   
                      color:#ffffff;
                     }
                     .talkContent{ 
                      padding:8px;
                      border-radius:3px;
                      float:left;
                      background:rgba(0,0,0,0.5);
                     }
                     .right{ 
                       float:right!important;  
                     }
                     .bgImg{ 
                        position:absolute;
                        width:100%;
                        height:100%;
                        opacity:0.6;
                        display: block;
                        left: 0;
                        top: 0;
                     }
                     `
                }</style>
        </div>
    )
}

export default TalkBox