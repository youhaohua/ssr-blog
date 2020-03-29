import Link from 'next/link'
import {Button} from "antd"
import {CalendarOutlined, ContactsOutlined, CommentOutlined, EyeOutlined, FileTextOutlined} from '@ant-design/icons'
export default({data}) => {
  return (
    <div className="articleItem clearfix">
      <div className="imgBox">
        <img
          src="https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585843815&t=c5412f210c26cf6365222d97eb3efaac"
          className="articleImg"
          alt="xx"/>
      </div>

      <div style={{
        float: "left",
        width:'5.8rem'
      }}>
        <p className="title">{data.title}</p>
        <p className="desc" style={{
          marginTop: "15px"
        }}>
          <span className="distance"><CalendarOutlined className="icon"/>发表于{data.createtime}</span>
          <span className="distance"><ContactsOutlined className="icon"/>更新于xxx</span>
          <span className="distance"><CommentOutlined className="icon"/>评论次数{data.comments}</span>
          <span className="distance"><EyeOutlined className="icon"/>阅读次数{data.read}</span>
          <span className="distance"><FileTextOutlined className="icon"/>本文字数:xxx</span>
        </p>
      </div>
      <Link href={`/detail?id=${data.id}`} >
        <Button type="primary" className="checkButton">查看</Button>
      </Link> 
      <style jsx>
        {
          ` .articleItem {
            background: #ffffff;
            height: 1.8rem;
            width: 100%;
          }
          .articleItem:hover {
            background: rgb(208, 208, 208,0.1);
          }
          .articleImg {
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            top: 50%;
            margin-top: -0.75rem;
          }

          .imgBox {
            position: relative;
            float: left;
            height: 100%;
            width: 1.5rem;
            margin-right: 0.15rem;
          }
           `
        }</style>
    </div>
  )
}