import {withRouter} from "next/router"
import Header from "../../components/Header"
import {useState, useEffect,useLayoutEffect} from "react"
import {getBlog} from "../../api/blog"
const detail = ({router,data}) => {
    console.log("data",data)
    return (
        <div>
            <Header/>
            <div className="detailContent">
                <p className='contentTitle'>{data.data[0].title}</p>
                <div className="content">
                <div dangerouslySetInnerHTML = {{__html:data.data[0].content}} ></div>
                </div>
            </div>
        </div>
    )
}
detail.getInitialProps=async(ctx,router)=>{ 
    console.log('res cookie',ctx.query)
    const params={id:ctx.query.id}
   const data=await getBlog(params)
    return{ 
     data
    }
   }
export default withRouter(detail)