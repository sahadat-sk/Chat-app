const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please enter all fields"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.sendStatus(401); // unauthorized
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.sendStatus(401); // unauthorized
    }
    const accessToken = jwt.sign({
        id:user._id,
        name:user.name,
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"300s"});

    const refreshToken = jwt.sign(
        {email:user.email,userId:user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1d"}
    )
    await User.findOneAndUpdate({email},{refreshToken:refreshToken});

    //cookie with refrest token
    res.cookie('jwt',refreshToken,{httpOnly:true,secure:false,sameSite:'None',maxAge:24*60*60*1000});
    
    //authorization with access token to user
    res.status(200).json({name:user.name,accessToken});
}

module.exports = {handleLogin};