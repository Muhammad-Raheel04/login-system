import mongoose from "mongoose";

const sessonSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Session=mongoose.model("Session",sessonSchema);