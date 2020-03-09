
const LeftPanel=()=>{ 

return( 
 <div className="leftPanel">
  <div className='text-bg'>
<p className="big">我拿下河流你就是潮汐</p>
<p className="small">我拿下ktv你就是妈咪</p> 
  </div>
 <style jsx>
{` 
.leftPanel{ 
 height:100%;
 float:left;
 width:40%; 
 background:url('../static/images/leftPanel.jpg') center center no-repeat;
 background-size:cover; 
 position:relative; 
}
.text-bg{ 
position:absolute;
top:50%;
transform:translateY(-50%);
left:0;
height:3rem;
border-radius:0.1rem;
width:3rem;
margin:0 auto;
background:rgba(0,0,0,0.1);
color:#ffffff;
font-size:26px;
display:flex;
justify-content:center;

padding:20px;
flex-direction:column;
}
.big{ 
 font-size:26px;
}
.small{font-size:18px; }
`    
}
 </style>
 </div>
)
}

export default LeftPanel