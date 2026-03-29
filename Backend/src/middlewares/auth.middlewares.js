const jwt = require('jsonwebtoken')
// const blackListModel=require('../models/blacklisting.model')
const redis=require('../config/cache')

async function identifyUser(req,res,next) {
    const token = req.cookies.token
    
    if(!token){
         return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }
    // const blacklistToken=await blackListModel.findOne({token})
    const blacklistToken=await redis.get(token)
    if(blacklistToken){
         return res.status(401).json({
            message:"user not authorized"
        })
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
        next()
    }
    catch{
        return res.status(401).json({
            message:"user not authorized"
        })
    }
    
}

module.exports = identifyUser