import express from 'express';
import mongoose  from 'mongoose';
import multer from 'multer';
import Video from './model/vdomodel.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
const app=express();
const __dirname = path.resolve();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
});
// if(process.env.NODE_ENV == "production")
// {
//   app.use(express.static("frontend/build"));
//   app.get('*', (req, res) =>
//   res.sendFile('/frontend/build/index.html')
// );
// }
 app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/',(req,res)=>{
//     res.send("server is created ");
// });
var storage =multer.diskStorage({
    destination:function (req,file,cb){
      cb(null,'frontend/build')
    },
    filename:(req,file,cb)=>{
      if(file.fieldname==="thumbnail"){
          cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }
    else if(file.fieldname==="video"){
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  }
});
const upload =multer({
 storage:storage,
 limits : {fileSize : 100000000},
 fileFilter(req, file, cb) {
   if(file.fieldname==="thumbnail"){
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 

   
    // upload only png,jpeg and jpg format
     return cb(new Error('Please upload a Image'))
   }
 cb(undefined, true)
}
else if(file.fieldname==="video"){
  if (!file.originalname.match(/\.(mp4|mkv|3gp)$/)) { 
    // upload only mp4 or mkv or 3gp format
     return cb(new Error('Please upload a video'))
   }
 cb(undefined, true)
}}
});

app.post('/upload',upload.fields([{
  name: 'thumbnail', maxCount: 1
}, {
  name: 'video', maxCount: 1
}]),async(req,res,next)=>{
  const uploadModel= new Video({
    name:req.body.name,
    year:req.body.year,
    language:req.body.language,
     thumbnail:`/${req.files.thumbnail[0].filename}`,
     video:`/${req.files.video[0].filename}`,
    });
    await uploadModel.save();
  console.log("uploaded successfully ");


});
app.get('/video',expressAsyncHandler(async (req, res) => {
    const vdo= await Video.find({});
    res.send(vdo);
  }))

  app.get(
    '/video_player/:id',
    expressAsyncHandler(async (req, res) => {
      const video = await Video.findById(req.params.id);
      if (video) {
        res.send(video);
      } else {
        res.status(404).send({ message: 'Video Not Found' });
      }
    })
  );

const port=process.env.port;
app.get('/',(req,res)=>{
  res.send("server is created");
})
app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`);
})