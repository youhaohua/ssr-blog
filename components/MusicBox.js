import "../static/js/smusic.min.js"
import '../styles/smusic.min.css'
import {useEffect} from "react"
var songList = [
    {
		title : '反方向的钟',
		singer : '周杰伦',
		audio : '../static/music/ffxdz.flac',
		thumbnail : '../static/music/ffxdz.jpeg',
		lyric : './data/chengdu.lrc'
    },
    {
		title : '上海一九四三',
		singer : '周杰伦',
		audio : '../static/music/1943.flac',
		thumbnail : '../static/music/1943.jpeg',
		lyric : './data/chengdu.lrc'
    },
    {
		title : '一方天地',
		singer : '张本煜',
		audio : '../static/music/yftd.flac',
		thumbnail : '../static/music/yftd.jpeg',
		lyric : './data/chengdu.lrc'
    },
    {
		title : 'Hey Kong',
		singer : '刘聪',
		audio : '../static/music/heykong.flac',
		thumbnail : '../static/music/heykong.jpeg',
		lyric : './data/chengdu.lrc'
	},
	{
		title : '后会无期',
		singer : '邓紫棋',
		audio : '../static/music/hhwq.flac',
		thumbnail : '../static/music/hhwq.jpeg',
		lyric : './data/chengdu.lrc'
	}
]
const MusicBox=()=>{ 

 useEffect(()=>{
    const smusic = window.SMusic(songList, {
	container : document.getElementById('my-music')
	});
	smusic.init()
  return()=>{ }
  })
return(
  <div className="musicBox">
     <div id="my-music">
     </div> 

     <style jsx>{`
      `}
     </style>
  </div>
)
}

export default MusicBox