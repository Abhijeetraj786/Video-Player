import React, { useState } from 'react';
import Axios from 'axios';
import {ProgressBar} from 'react-bootstrap'

export default function Upload(props){
    const [name,setName]=useState('');
    const [year,setYear]=useState('');
    const [language,setLanguage]=useState('');
    const [thumbnail,setThumbnail]=useState([]);
     const [video,setVideo]=useState([]);
     const [progress, setProgress] = useState();
    // const fileOnChange=async(e)=>{
    //     setVideo(e.target.files[0]);
    //     const formData =new FormData();
    //     formData.append('video',video);
    //     const config={
    //         headers:{
    //             'content-type':'multipart/form-data'
    //         }
    //         }
    //     await Axios.post('http://localhost:5000/vdo',formData);

    // }

    const submitHandler =async(e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('name',name);
        bodyFormData.append('year',year);
        bodyFormData.append('language',language);
        bodyFormData.append('thumbnail', thumbnail);
        bodyFormData.append('video',video);
        const config={
            headers:{
                'content-type':'multipart/form-data'

            }
        }
        console.log(thumbnail);
        console.log(video);
       
    await Axios.post('/upload',bodyFormData,{config, onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      },});
      };
      // const uploadFileHandler = async (e) => {
      //   const file = e.target.files[0];
      //   const bodyFormData = new FormData();
      //   bodyFormData.append('thumbnail', file);
      //   try {
      //     const { data } = await Axios.post('/profile-upload-single', bodyFormData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data'
      //       }
      //     });
      //     setThumbnail(data);
      //   } catch (error) {
      //    alert("Error")
      //   }
      // };

    return(
        <div className = "form-content">
            <form  onSubmit={submitHandler}>
                <div className="form">
             <div>
                 <label htmlFor="name">Movie Name</label>
                 <input
                  type="text"
                  id="name"
                  name='name'
                  placeholder="Enter Movie Name"
                  required
                  onChange={(e) => setName(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="year">Year Of Release</label>
                 <input
                  type="number"
                  id="year"
                  name='year'
                  placeholder="Enter year of release"
                  required
                  onChange={(e) => setYear(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="language">Language</label>
                 <input
                  type="text"
                  id="language"
                  name='language'
                  placeholder="Language"
                  required
                  onChange={(e) => setLanguage(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="thumbnail">Movie Thumbnail</label>
                 <input
                  type="file"
                  id="thumbnail"
                  name='thumbnail'
                  placeholder="Enter thumbnail"
                  required
                  onChange={(e)=>{
                    setThumbnail(e.target.files[0])
                }}>
                  </input>
             </div>
              <div>
                 <label htmlFor="video"> Movie </label>
                 <input
                  type="file"
                  id="video"
                  name='video'
                  placeholder="Upload Video"
                  required
                  onChange={(e)=>{
                      setVideo(e.target.files[0])
                  }}>
                  </input>
             </div> 
             </div>
             <div className="progress"> 
             <div>
                 <button type="submit">Upload</button>
                 </div> 
                 <div>
                    <span>Uploading Status : </span>
                 {progress && <ProgressBar now={progress} label={`${progress}%`} />}
                 </div>
             </div>
            </form>
        </div>
    )
}
