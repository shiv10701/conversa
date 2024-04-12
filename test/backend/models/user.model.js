import Mongoose, { Schema } from 'mongoose';

const user_schema=new Mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    pass:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Others"],
        default:"Others"
    },
    dob:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["Online","Offline"],
        default:"Offline"
    },
    profile_img:{
        type:String,
        default:""
    },
    deletedAt:{
        type:Date,
    },
    country:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["Personal","Business"],
        default:"Personal"
    },
    blocked_by:[{
        type:Schema.Types.ObjectId,
        ref:user
    }]
},{timestamps:true})

const user=Mongoose.model("user",user_schema);

export default user;