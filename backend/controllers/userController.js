import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
        })
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10m' });
        try {
            await verifyEmail(token, email);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
        newUser.token = token;
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User Registerd successfully",
            user: newUser,
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing",
            })
        }
        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired',
                })
            }
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified"
            })
        }

        user.token = null;
        user.isVerified = true;
        await user.save();

        return res.status(200).json({
            success: false,
            message: "Email verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist",
            })
        }
        const isPassword = await bcrypt.compare(password, existingUser.password);
        if (!isPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        if (existingUser.isVerified === false) {
            return res.status(400).json({
                success: false,
                message: "Verify your account then login"
            })
        }

        const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '100y' });

        existingUser.isLoggedIn = true;
        await existingUser.save();

        const existingSession = await Session.findOne({ userId: existingUser._id });
        if (existingSession) {
            await Session.deleteOne({ userId: existingUser._id });
        }

        await Session.create({ userId: existingUser._id });

        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: {
                name: `${existingUser.firstName} ${existingUser.lastName}`,
                role: existingUser.role
            },
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const logout=async(req,res)=>{
    try{
        const userId=req.id;
        await Session.deleteMany({userId:userId});
        await User.findByIdAndUpdate(userId,{isLoggedIn:false});

        return res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}