import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
export default function Home(props){
    const [video,setVideo]=useState([]);
    useEffect(() => {
        const fetchData=async()=>{
            try {
                const {data}= await Axios.get('/video');
               //  console.log(data);
                setVideo(data);
               } catch ( err) {
                   alert("error occur")
               }
        }
        fetchData();

        
    }, []);


    return (
        <div className = "container">
          {
              video.map(video =>
                 <div key={video._id} className="card">
                     <Link to={'/video_player/'+video._id}>
                         <img className="medium" src={video.thumbnail} alt='movie thumbnail'/>
                     </Link> 
                     <div className="card-body">
                       <Link to={'/video_player/'+video._id}>
                           <h3>movie Name: {video.name}</h3>
                           <h3>language: {video.language}</h3>
                           <h3>year: {video.year}</h3>
                       </Link>
                     </div>
                 </div>
              )
          }
        </div>
    );
}