import mongoose from 'mongoose';

const vdoSchema=new mongoose.Schema(
    {
        name:{type:String,required:true },
        year:{type:Number,required:true},
        language:{type:String,required:true},
        thumbnail:{type:String,required:true},
         video:{type:String,required:true},
    },
    {
        timestamp:true
    }
);
const Video=mongoose.model('video',vdoSchema);
export default Video;
