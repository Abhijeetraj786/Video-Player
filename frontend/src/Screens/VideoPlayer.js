import React,{useEffect, useState} from 'react';
import ReactPlayer from 'react-player'
import Axios from 'axios';


export default function VideoPlayer(props){
   const videoId=props.match.params.id;
   const [vdoURL,setVdoURL]=useState('');
   useEffect(() => {
       const fetchVideo=async()=>{
           const obj= await Axios.get(`/video_player/${videoId}`);
            setVdoURL(obj.data.video);
           
       }
      fetchVideo();
   }, [videoId])
//     console.log(video)
//    console.log(obj);
console.log(vdoURL)
    return(
        <div className="player">
            <ReactPlayer  url={vdoURL} playing="true" controls="true"  />
           {/* <ReactVideo src="/files/video1626845871104.mp4"/> */}
        </div>
    )
}
