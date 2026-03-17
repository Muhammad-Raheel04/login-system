import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters"],
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        lowercase:true,
        trim:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

export const User=mongoose.model('User',userSchema);