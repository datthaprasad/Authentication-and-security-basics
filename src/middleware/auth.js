const jwt=require('jsonwebtoken')
const User=require('../mongoose/models/user')

const auth=async (req,res,next)=>{
    try{
    const token=req.header('Authorization').replace("Bearer ","")
    
    const verify=jwt.verify(token,'task');
    const user=await User.findOne({_id:verify._id,'tokens.token':token})

    if(!user)
        throw new Error()

    req.user=user;
    req.token=token;
    next();
    }
    catch(e){
        res.status(401).send("Please create or login to account")
    }
}

module.exports=auth;    