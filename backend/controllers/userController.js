import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
export const register=async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            firstName,
            lastName,
            password:hashedPassword,
            email,
        })
        await newUser.save();
        return res.status(201).json({
            success:true,
            message:"User Registerd successfully",
            newUser,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}