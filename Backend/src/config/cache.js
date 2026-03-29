const Redis = require("ioredis").default

const redis=new Redis({
    host:process.env.Redis_Host,
    port:process.env.Redis_Port,
    password:process.env.Redis_Password
})


redis.on("connect",()=>{
    console.log("redis connected")
})

redis.on("error",(err)=>{
    console.log(err)
})

module.exports=redis