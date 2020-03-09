import { Button } from 'antd';
import Link from "next/link"
const Header=()=>{ 
 const handleLogin=()=>{ 
     console.log("点击了登录按钮")
 }
return( 
 <header  className='header'>
  <Link href="/home" ><Button type="primary" onClick={handleLogin} >首页</Button></Link>
</header> 
)
}

export default Header;