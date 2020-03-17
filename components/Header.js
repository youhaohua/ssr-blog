import { Button , Avatar} from 'antd';
import Link from "next/link"
const Header=()=>{ 
 const handleLogin=()=>{ 
     console.log("点击了登录按钮")
 }
 let isLogin=false
 const content=isLogin?(
 <div className="userBox" >
<span style={{marginRight:"10px"}}>用户名</span>
 <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
 </div>):(<Link href="/login" ><Button  onClick={handleLogin} >登录</Button></Link>)

return( 
 <header  className='header'>
  {content}
</header> 
)
}

export default Header;