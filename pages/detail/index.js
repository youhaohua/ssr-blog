import {withRouter} from "next/router"
import Header from "../../components/Header"
import {useState, useEffect, useLayoutEffect} from "react"
import {getBlog,getComment} from "../../api/blog"
import {
    Comment,
    Tooltip,
    List,
    Input,
    Button,
    Modal,
    Form,
    message
} from 'antd'
import moment from 'moment'
import {addComment} from "../../api/blog"
import md5 from 'js-md5'
import {CalendarOutlined, ContactsOutlined, CommentOutlined, EyeOutlined, FileTextOutlined} from '@ant-design/icons'
const {TextArea} = Input;
const detail = ({router, data,dataComment}) => {
    console.log("data",data,dataComment);
    const [infoVisible,
        setVisible] = useState(false)
    const [comment,setComment]=useState(dataComment)
    const [content,setContent]=useState('')
    const handleComment = () => {
         if(content.length>100){ 
            message.warning('字数超出限制,请控制在100字内');  
            return false
         }
        if(!localStorage.getItem("_info_visitor")){ 
            setVisible(infoVisible => true)
            return false
      }
      const params={
        name: JSON.parse(localStorage.getItem("_info_visitor")).name,
        content,
        id_a:router.query.id  
      }
      addComment(params).then(async res=>{ 
       if(res.errno==0){
        message.info('评论成功');
        const params={
        id:router.query.id
        } 
        const updateComment=await getComment(params)
        setComment(comment=>updateComment.data)
       }else{ 
        message.info('评论失败'); 
       }   
      })
    }
    const handleContent=(e)=>{ 
        e.persist()
      setContent(content=>e.target.value)
    }
    const onFinish = values => {
        console.log('Success:', values);
        values.uname=values.name+md5('slat2020');
        localStorage.setItem("_info_visitor",JSON.stringify(values))
        setVisible(infoVisible =>false)
      };
     const handleModelCancel=()=>{ 
        setVisible(infoVisible =>false)
     }
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      }
   const listComment= comment.map((item)=>({
    author:item.name,
    avatar:"./../static/images/boy.png",
    content: (
        <p>{item.content}</p>
    ),
    datetime: (
        <Tooltip
            title={item.date}>
            <span>
              {item.date}  
            </span>
        </Tooltip>
    )
   })) 
    return (
        <div>
            <Header/>
            <div className="detailContent">
                <p className='contentTitle'>{data.data[0].title}</p>
                <div
                    style={{
                    textAlign: "center",
                    margin: "10px 0"
                }}>
                    <span className="distance"><CalendarOutlined className="icon"/>发表于{data.data[0].createtime}</span>
                    <span className="distance comment"><CommentOutlined className="icon"/>评论数{data.data[0].comments}</span>
                    <span className="distance"><EyeOutlined className="icon"/>阅读次数{data.data[0].read}</span>
                    <span className="distance"><FileTextOutlined className="icon"/>本文字数:xxx</span>
                </div>
                <div className="content">
                    <div
                        dangerouslySetInnerHTML={{
                        __html: data.data[0].content
                    }}></div>
                </div>

                <List
                    className="comment-list"
                    style={{
                    marginTop: "30px",
                    marginBottom: "50px"
                }}
                    itemLayout="horizontal"
                    header={`评论`}
                    dataSource={listComment}
                    renderItem={item => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}/>
                    </li>
                )}/>
                <TextArea onChange={handleContent} rows={4}/>
                <Button
                    onClick={handleComment}
                    type="primary"
                    style={{
                    display: 'block',
                    margin: "0 auto",
                    marginBottom: "50px",
                    marginTop: "20px"
                }}>发布评论</Button>
            </div>
            <Modal
                title="完善你的个人信息"
                visible={infoVisible}
                onCancel={handleModelCancel}
                footer={null}>
               <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="昵称"
        name="name"
        rules={[{ required: true, message: '输入您的昵称!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '输入您的邮箱!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="网站"
        name="site"
        rules={[{ required: true, message: '输入您的个人网站!' }]}
      >
        <Input/>
      </Form.Item>  
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
            </Modal>
            <style jsx> {` .distance {
                    margin-right: 15px;
                    }
                    .icon {
                        margin-right: 5px;
                    }
                    .comment {
                        color: #00a67c;
                    }
                     `
                }</style>
        </div>
    )
}
detail.getInitialProps = async({ctx, router}) => {
    const params = {
        id:ctx.query.id
    }
    const data = await getBlog(params)
    const comment=await getComment(params)
    return {
        data,
        dataComment:comment.data?comment.data:[]
    }
}
export default withRouter(detail)