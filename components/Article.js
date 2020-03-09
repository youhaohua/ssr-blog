import Link from 'next/link'
import {CalendarOutlined, ContactsOutlined, CommentOutlined, EyeOutlined, FileTextOutlined} from '@ant-design/icons';
export default({data}) => {
  return (
    <Link href={"/detail?id=xxx"} as={'/detail/xxx'}>
      <div className="articleItem">
        <p className="title">{data.title}</p>
        <p className="desc">
          <span className="distance"><CalendarOutlined className="icon"/>发表于{data.createtime}</span>
          <span className="distance"><ContactsOutlined className="icon"/>更新于xxx</span>
          <span className="distance"><CommentOutlined className="icon"/>评论次数{data.comments}</span>
          <span className="distance"><EyeOutlined className="icon"/>阅读次数{data.read}</span>
          <span className="distance"><FileTextOutlined className="icon"/>本文字数:xxx</span>
        </p>
        <p className="content">
          {data.content}
        </p>
        <style jsx>
        {
          ` .articleItem {
            background: #ffffff;
          }
          .articleItem:hover{
           background:rgb(208, 208, 208,0.1);
          }
           `
        }</style>
      </div>
    </Link>
  )
}