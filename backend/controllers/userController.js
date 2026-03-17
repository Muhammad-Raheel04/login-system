export const register=async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        return res.json({
            success:true,
            message:"User Registerd successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}