import {Button} from "antd"
import {useRef} from "react"

const SetBlog=()=>{ 
 const editRef=useRef()

 useEffect(() => {
     
     return () => {
       
     };
 })

 return( 
    <div>
      <div ref={editRef}>

      </div>
      <Button>发布</Button>
    </div> 
 )

}